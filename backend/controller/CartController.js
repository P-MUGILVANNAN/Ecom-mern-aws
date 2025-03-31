const express = require('express');
const Cart = require("../model/CartSchema");
const Product = require("../controller/ProductController");
const router = express.Router();

// Add product to cart
router.post("/add",async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // Increase quantity if product exists
      } else {
        cart.items.push({ productId, quantity }); // Add new product to cart
      }
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

// Get user's cart
router.get("/:userId",async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

// Remove product from cart
router.post("/remove",async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
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


// router.post("/add", cartController.addToCart);
// router.get("/:userId", cartController.getCart);
// router.post("/remove", cartController.removeFromCart);
// router.delete("/clear/:userId", cartController.clearCart);