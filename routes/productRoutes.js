const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { ProductModel } = require("../models/productModel");

const productRouter = express.Router();

productRouter.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRouter.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRouter.post("/products", auth, async (req, res) => {
  try {
    const { name, picture, description, gender, category, price } = req.body;

    if (!name || !category || !price) {
      return res
        .status(400)
        .json({ error: "Name, category, and price are required fields" });
    }

    const newProduct = new ProductModel({
      name,
      picture,
      description,
      gender,
      category,
      price,
    });

    await newProduct.save();
    res.status(201).json({ msg: "New product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRouter.put("/products/:id", auth, async (req, res) => {
  try {
    const { name, picture, description, gender, category, price } = req.body;

    if (!name || !category || !price) {
      return res
        .status(400)
        .json({ error: "Name, category, and price are required fields" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          picture,
          description,
          gender,
          category,
          price,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRouter.delete("/products/:id", auth, async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(202).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { productRouter };
