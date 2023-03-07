import ProductManager from "./ProductManager.js";
import express from "express";

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("products.json");

app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const products = await productManager.getProducts();
  let findProduct = products.find((p) => p.id === productId);

  if (!findProduct) {
    res.send("User not existent");
  } else {
    res.json({ findProduct });
  }
});

app.get("/products", async (req, res) => {
  const question = req.query;
  const { limit } = req.query;
  const products = await productManager.getProducts();
  if (!limit) {
    res.json({ products });
  } else {
    let newLimit = parseInt(req.query.limit);
    console.log("->", typeof newLimit, newLimit);
    const filterProducts = products.filter((p) => p.id <= newLimit);
    res.json({ filterProducts });
  }
});

app.listen(port, () => {
  console.log(`Listen port ${port}`);
});
