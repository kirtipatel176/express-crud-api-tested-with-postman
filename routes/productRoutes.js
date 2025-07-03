const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET one by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// POST create
router.post('/', async (req, res) => {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  await product.save();
  res.status(201).json(product);
});

// PUT update
router.put('/:id', async (req, res) => {
  const { name, price } = req.body;
  const updated = await Product.findByIdAndUpdate(req.params.id, { name, price }, { new: true });
  if (!updated) return res.status(404).send('Product not found');
  res.json(updated);
});

// DELETE remove
router.delete('/:id', async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send('Product not found');
  res.send('Product deleted');
});

module.exports = router;
