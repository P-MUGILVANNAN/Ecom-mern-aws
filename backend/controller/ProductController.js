const express = require("express");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const Product = require("../model/ProductSchema");

dotenv.config();
const router = express.Router();

// ✅ AWS S3 Configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// ✅ Multer Storage (Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * ✅ Upload image to S3 and return URL
 */
const uploadToS3 = async (file) => {
    if (!file) {
        throw new Error("File is required");
    }

    const fileName = `products/${Date.now()}-${file.originalname}`;

    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

// ✅ Add a New Product with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // ✅ Correct image upload handling
        const imageUrl = await uploadToS3(req.file);

        const newProduct = new Product({
            name,
            description,
            price: Number(price),
            category,
            imageUrl,
            stock: Number(stock),
        });

        await newProduct.save();
        res.status(201).json({ message: "✅ Product added successfully!", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "❌ Error adding product", error: error.message });
    }
});

// Get trending products (Example: Fetch top 5 products based on category or stock)
router.get("/trending", async (req, res) => {
    try {
        const trendingProducts = await Product.find().limit(5); // Adjust limit as needed
        res.json(trendingProducts);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get products by category
router.get("/category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// ✅ Get All Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "❌ Error fetching products", error: error.message });
    }
});

// ✅ Get a Single Product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "❌ Product not found" });
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "❌ Error fetching product", error: error.message });
    }
});

// ✅ Update a Product (with optional image upload)
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let updatedData = { name, description, price: Number(price), category, stock: Number(stock) };

        if (req.file) {
            const imageUrl = await uploadToS3(req.file);
            updatedData.imageUrl = imageUrl;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedProduct) return res.status(404).json({ message: "❌ Product not found" });

        res.json({ message: "✅ Product updated successfully!", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "❌ Error updating product", error: error.message });
    }
});

// ✅ Delete a Product
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "❌ Product not found" });

        res.json({ message: "✅ Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "❌ Error deleting product", error: error.message });
    }
});

module.exports = router;
