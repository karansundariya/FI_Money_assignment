const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const auth = require('../middlewares/auth.js');

// Add Product
router.post('/', auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ id: product._id, message: 'Product added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Product Quantity
router.put('/:id/quantity', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity } },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Quantity updated', product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Products (Paginated)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();
    res.json({ products, total, page, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 