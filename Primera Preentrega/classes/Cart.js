const crypto = require("crypto")
const fs = require("fs")
const data = require("../data/carts.json")
const status200 = require("../help")

class Cart {
  constructor() {
    this.file = data
    this.cart = {}
  }

  generateCartID() {
    if (!this.cart.length) {
      const IDCart = crypto.randomUUID()
      return IDCart
    }
  }

  async createCart(cart) {
    if (cart) {
      const updatedCarts = [...this.file, cart]
      const response = await fs.promises
        .writeFile("./data/carts.json", JSON.stringify(updatedCarts, null, 2))
        .then((res) => {
          return { message: "Cart creado exitosamente.", code: 201 }
        })
        .catch((error) => {
          return {
            message: `Error al crear el cart. ${error}`,
            code: 500,
          }
        })
      return status200(response.code)
        ? { ...response, data: updatedCarts }
        : response
    }
  }

  async deleteCartByID(id) {
    const existCart = (id) => {
      const cartToDelete = this.file.find((item) => item.id === id)
      if (cartToDelete) return true
      else return false
    }
    if (existCart(id)) {
      const updatedCarts = this.file.filter((cart) => cart.id !== id)
      const response = await fs.promises
        .writeFile("./data/carts.json", JSON.stringify(updatedCarts, null, 2))
        .then((res) => {
          return { message: "Cart eliminado exitosamente.", code: 200 }
        })
        .catch((error) => {
          return {
            message: `Error al eliminar el cart. ${error}`,
            code: 500,
          }
        })
      return status200(response.code)
        ? { ...response, data: updatedCarts }
        : response
    } else return { message: "No se ha encontrado el cart.", code: 404 }
  }

  getAllProdsInCart(id) {
    const cart = this.file.find((cart) => cart.id === id)
    if (cart) {
      this.cart = cart
      return {
        message: "Productos obtenidos exitosamente.",
        code: 200,
        data: this.cart,
      }
    } else return { message: "No se ha encontrado el cart.", code: 404 }
  }

  getAllCarts() {
    let carts = []
    if (this.file && this.file.length) {
      carts = this.file
    }
    return {
      message: "Carts obtenidos exitosamente.",
      code: 200,
      data: carts,
    }
  }

  async addCart(cart) {
    if (cart) {
      const updatedCartsFile = [...this.file, cart]
      const response = await fs.promises
        .writeFile("./data/carts.json", JSON.stringify(updatedCartsFile, null, 2))
        .then((res) => {
          return {
            message: "Producto añadido exitosamente.",
            code: 201,
            data: updatedCartsFile,
          }
        })
        .catch((error) => {
          return {
            message: `Error al añadir el producto. ${error}`,
            code: 500,
          }
        })
      return response
    }
  }

  async addProdToCart(id, product) {
    const cart = this.file.find((cart) => cart.id === id)
    if (cart) {
      if (product && product.id) {
        const updatedCart = { ...cart, products: [...cart.products, product] }
        const updatedCartsFile = [
          ...this.file.filter((cart) => cart.id !== id),
          updatedCart,
        ]
        const response = await fs.promises
          .writeFile("./data/carts.json", JSON.stringify(updatedCartsFile, null, 2))
          .then((res) => {
            return {
              message: "Producto añadido exitosamente.",
              code: 201,
              data: updatedCart,
            }
          })
          .catch((error) => {
            return {
              message: `Error al añadir el producto. ${error}`,
              code: 500,
            }
          })
        return response
      } else return { message: "No se ha encontrado la ID del producto.", code: 404 }
    } else return { message: "No se ha encontrado el cart.", code: 404 }
  }

  async deleteCartProd(id, id_prod) {
    if (isNaN(id_prod))
      return { message: "La ID del producto no es válida.", code: 400 }
    const cart = this.file.find((cart) => cart.id === id)
    const existProdInCart = (id) => {
      const prodToDelete = this.file.find((item) => item.id === id)
      if (prodToDelete) return true
      else return false
    }
    if (cart) {
      const prodsInCart = cart.products
      if (existProdInCart(id_prod)) {
        const updatedProdList = prodsInCart.filter(
          (product) => product.id !== Number(id_prod)
        )
        const updatedCart = { ...cart, products: updatedProdList }
        const updatedCartsFile = [
          ...this.file.filter((cart) => cart.id !== id),
          updatedCart,
        ]
        const response = await fs.promises
          .writeFile("./data/carts.json",JSON.stringify(updatedCartsFile, null, 2))
          .then((res) => {
            return {
              message: "Producto eliminado del cart exitosamente.",
              code: 201,
              data: updatedCart,
            }
          })
          .catch((error) => {
            return {
              message: `Error al eliminar el producto. ${error}`,
              code: 500,
            }
          })
        return response
      } else return { message: "No se ha encontrado el producto.", code: 404 }
    } else return { message: "No se ha encontrado el cart.", code: 404 }
  }
}

const carts = new Cart()

module.exports = carts