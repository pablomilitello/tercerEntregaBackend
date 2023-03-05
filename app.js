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

const product4 = {
  title: "boots",
  description: "white boots",
  price: 23,
  thumbnail: true,
  code: "ABC0004",
  stock: 10,
};

const product5 = {
  title: "belt",
  description: "red belt 1m",
  price: 7,
  thumbnail: true,
  code: "ABC0005",
  stock: 5,
};

const product6 = {
  title: "dress",
  description: "pink beautifull dress",
  price: 12,
  thumbnail: true,
  code: "ABC0006",
  stock: 3,
};

const product7 = {
  title: "jacket",
  description: "black and white jacket",
  price: 25,
  thumbnail: true,
  code: "ABC0007",
  stock: 7,
};

const product8 = {
  title: "hat",
  description: "sun hat brown",
  price: 6,
  thumbnail: true,
  code: "ABC0008",
  stock: 12,
};

const product9 = {
  title: "socks",
  description: "large socks",
  price: 3,
  thumbnail: true,
  code: "ABC0009",
  stock: 20,
};

const product10 = {
  title: "gloves",
  description: "medium black gloves",
  price: 7,
  thumbnail: true,
  code: "ABC00010",
  stock: 15,
};

const product = new ProductManager("products.json");

const runAddProduct = async () => {
  await product.addProduct(product1);
  await product.addProduct(product2);
  await product.addProduct(product3);
  await product.addProduct(product4);
  await product.addProduct(product5);
  await product.addProduct(product6);
  await product.addProduct(product7);
  await product.addProduct(product8);
  await product.addProduct(product9);
  await product.addProduct(product10);
};

app.get("/products", (req, res) => {
  const question = req.query;
  const { limit } = req.query;

  if (!limit) {
    const runGetProducts = async () => {
      await runAddProduct();
      const products = await product.getProducts();
      res.send({ products });
    };
    runGetProducts();
  } else {
    const runGetProducts = async () => {
      await runAddProduct();
      const products = await product.getProducts();
      const filterProducts = products.filter((elem) => {
        parseInt(elem.id) = limit;
      });
      console.log(filterProducts);
      res.send({ filterProducts });
    };
    runGetProducts();
  }
});

// Esto funciona
// app.get("/products", (req, res) => {
//   const question = req.query;
//   const { limit } = req.query;
//   const runGetProducts = async () => {
//     await runAddProduct();
//     const products = await product.getProducts();
//     res.send({ products });
//   };
//   runGetProducts();
// });

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
