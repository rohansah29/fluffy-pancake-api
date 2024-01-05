const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  picture: { type: String },
  description: { type: String },
  gender: { type: String, enum: ["male", "female"] },
  category: { type: String, enum: ["makeup", "skincare", "haircare"] },
  price: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
