// routes/productRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET one
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// POST with validation
router.post(
  '/',
  [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 chars'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number > 0')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  }
);

// PUT update
router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updated) return res.status(404).send('Product not found');
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send('Product not found');
  res.send('Product deleted');
});

module.exports = router;
