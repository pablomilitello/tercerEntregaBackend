import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  askProductExists = async () => {
    if (fs.existsSync(this.path)) {
      const fileInformationProduct = await fs.promises.readFile(this.path, "utf-8");
      const productsInFile = JSON.parse(fileInformationProduct);
      return productsInFile;
    } else {
      console.log("--> File not found");
      return [];
    }
  };

  addProduct = async (product) => {
    const productsInFileFromAsk = await this.askProductExists();
    const id = this.#generateID(productsInFileFromAsk);
    const newProductFile = { id, ...product };
    productsInFileFromAsk.push(newProductFile);
    await fs.promises.writeFile(this.path, JSON.stringify(productsInFileFromAsk));
    return newProductFile;
  };

  getProductsById = async (id) => {
    const products = await this.askProductExists();
    const product = products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "--> Product not found";
    }
  };

  updateProduct = async (id, obj) => {
    const products = await this.askProductExists();
    const indexProduct = products.findIndex((elem) => elem.id === id);
    if (indexProduct == -1) {
      return "--> Product not found";
    } else {
      const actualProduct = { ...products[indexProduct], ...obj };
      products.splice(indexProduct, 1, actualProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
  };

  deleteProducts = async () => {
    if (fs.existsSync(this.path)) {
      await fs.promises.unlink(this.path);
      return "Delete products";
    } else {
      return "--> Non-existent file";
    }
  };

  deleteProductsById = async (id) => {
    const products = await this.askProductExists();
    const arrayNewProducts = products.filter((user) => user.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(arrayNewProducts));
    return arrayNewProducts;
  };

  getProducts = async () => {
    const fileInformationProduct = await fs.promises.readFile(this.path, "utf-8");
    const productsInFile = JSON.parse(fileInformationProduct);
    return productsInFile;
  };

  #generateID = (products) => {
    let id;
    if (products.length === 0) {
      id = 1;
    } else {
      id = products[products.length - 1].id + 1;
    }
    return id;
  };
}

export default ProductManager;

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

const productManager = new ProductManager("products.json");

const runAddProduct = async () => {
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product3);
  await productManager.addProduct(product4);
  await productManager.addProduct(product5);
  await productManager.addProduct(product6);
  await productManager.addProduct(product7);
  await productManager.addProduct(product8);
  await productManager.addProduct(product9);
  await productManager.addProduct(product10);
};

// runAddProduct();
