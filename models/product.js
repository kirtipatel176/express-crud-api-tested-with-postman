// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    price: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
