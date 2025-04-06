const express = require('express');
const mongoose = require('mongoose');
const Cart = require("../model/CartSchema");
const Product = require("../controller/ProductController");
const router = express.Router();

router.post("/add", async (req, res) => {
  console.log("🚀 Received Add to Cart Request:", req.body);

  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing userId, productId, or quantity" });
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find((item) => item.productId.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json({ message: "Product added to cart", cart });
});




// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received userId:", userId); // Debugging

    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    
    if (!cart) {
      console.log("No cart found for user:", userId);
      return res.json({ items: [] }); // Return empty cart instead of error
    }

    console.log("Cart fetched:", cart); // Debugging

    res.json(cart.items.map(item => ({
      _id: item.productId._id,
      name: item.productId.name,
      imageUrl: item.productId.imageUrl,
      price: item.productId.price,
      quantity: item.quantity,
    })));

  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
});


// Remove product from cart
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Remove the product from cart in one query
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: productObjectId } } },
      { new: true } // Return updated cart
    );

    if (!updatedCart) return res.status(404).json({ message: "Cart not found" });

    // If cart is empty after removal, delete it
    if (updatedCart.items.length === 0) {
      await Cart.deleteOne({ _id: updatedCart._id });
      return res.json({ message: "Cart emptied and deleted" });
    }

    res.json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Error removing from cart", error });
  }
});


// Clear user's cart
router.delete('/clear/:userId',async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

module.exports = router;

