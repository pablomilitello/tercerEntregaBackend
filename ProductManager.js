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
