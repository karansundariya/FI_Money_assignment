const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const auth = require('../middlewares/auth.js');

// Most added products (by name/sku)
router.get('/most-added', auth, async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: { name: '$name', sku: '$sku' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json({ products: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 