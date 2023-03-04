import ProductManager from "./ProductManager.js";
import express from "express";

const port = 8080;

const app = express();

const product1 = {
  title: "jeans",
  description: "blue jeans medium",
  price: 30,
  thumbnail: true,
  code: "ABC0001",
  stock: 10,
};

const product2 = {
  title: "shirt",
  description: "white shirt medium",
  price: 20,
  thumbnail: true,
  code: "ABC0002",
  stock: 7,
};

const product3 = {
  title: "shoes",
  description: "black shoes 41",
  price: 22,
  thumbnail: true,
  code: "ABC0003",
  stock: 15,
};

const product = new ProductManager("products.json");

const run = async () => {
  await product.addProduct(product1);
  await product.addProduct(product2);
  await product.addProduct(product3);
  await product.getProducts();
};
const products = run();

app.get("/products", (req, res) => {
  res.send("hello");
});

// app.get("/:userId", (req, res) => {
//   const userId = parseInt(req.params.userId);

//   const findUser = users.find((u) => u.id === userId);

//   if (!findUser) {
//     res.send("User not existent");
//   } else {
//     res.send(findUser);
//   }
// });

app.listen(port, () => {
  console.log("Listen port 8080");
});
