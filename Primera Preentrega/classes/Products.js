const fs = require("fs")
const data = require("../data/products.json")
const status200 = require("../help")

class Product {
  constructor() {
    this.file = data
  }

  getAllProds() {
    return this.file.length
      ? { message: "Lista de productos obtenida exitosamente.", code: 200, data: this.file }
      : { message: "No hay productos en la lista.", code: 200, data: [] }
  }

  getProdByID(id) {
    if (isNaN(id)) {
      return { message: "id inválido", code: 400 }
    } else if (this.file && this.file.length) {
      const product = this.file.find((product) => product.id === id)
      if (product)
        return {
          message: "Producto obtenido exitosamente.",
          code: 200,
          data: product,
        }
      else return { message: "No se ha encontrado el producto.", code: 404 }
    } else return { message: "No hay productos.", code: 404, data: [] }
  }

  getProdID() {
    let id
    if (!this.file.length) {
      id = 1
    } else {
      const ids = this.file.map((product) => product.id)
      id = Math.max(...ids) + 1
    }
    return id
  }

  async loadProd(product) {
    if (product) {
      const id = this.getProdID()
      const prodToLoad = {
        ...product,
        id,
        codigo: id,
        timestamp: Date.now(),
      }
      this.file = [...this.file, prodToLoad]
      const response = await fs.promises
        .writeFile(`./data/products.json`, JSON.stringify(this.file, null, 2))
        .then((res) => {
          return { message: "Producto agregado exitosamente.", code: 201 }
        })
        .catch((err) => {
          return {
            message: `Error al guardar el producto. ${err}`,
            code: 500,
          }
        })
      return status200(response.code)
        ? { ...response, data: prodToLoad }
        : response
    }
  }

  async updateProd(id, product) {
    const productToUpdate = this.file.find((product) => product.id === id)
    if (productToUpdate && productToUpdate.id) {
      const filteredProducts = this.file.filter((item) => item.id !== id)
      this.file = [...filteredProducts, { ...productToUpdate, ...product }]
      const response = await fs.promises
        .writeFile(`./data/products.json`, JSON.stringify(this.file, null, 2))
        .then((res) => {
          return { message: "Producto actualizado exitosamente.", code: 201 }
        })
        .catch((error) => ({
          message: `Error al actualizar el producto. ${error}`,
          code: 500,
        }))
      return status200(response.code)
        ? { ...response, data: this.file }
        : response
    } else
      return {
        message: "No se ha encontrado el producto para actualizar.",
        code: 404,
      }
  }

  async deleteByID(id) {
    const existProd = (id) => {
      const prodToDelete = this.file.find((item) => item.id === id)
      if (prodToDelete) return true
      else return false
    }
    if (existProd(id)) {
      const updatedProds = this.file.filter((product) => product.id !== id)
      const response = await fs.promises
        .writeFile(`./data/products.json`, JSON.stringify(this.file, null, 2))
        .then((res) => {
          return { message: "Producto eliminado exitosamente.", code: 200 }
        })
        .catch((error) => {
          return {
            message: `Error al eliminar el producto. ${error}`,
            code: 500,
          }
        })
      return status200(response.code)
        ? { ...response, data: updatedProds }
        : response
    } else return { message: "No se ha encontrado el producto.", code: 404 }
  }
}

const products = new Product()

module.exports = products

