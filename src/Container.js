class Product {
    constructor() {
      this.products
    }
  
    getAll() {
      if (this.products?.length) return this.products
      else return []
    }
  
    getProductById(id) {
      let alert
      if (isNaN(id)) {
        alert = "ID no válido"
      } else if (this.products?.length) {
        const product = this.products.find((producto) => producto.id === id)
        if (product) return product
      } else alert = { error: "Producto no encontrado" }
      return alert
    }
  
    getProductId() {
      let id
      if (!this.products?.length) {
        id = 1
      } else {
        const ids = this.products.map((product) => product.id)
        id = Math.max(...ids) + 1
      }
      return id
    }
  
    uploadProduct(product) {
      if (product) {
        const id = this.getProductId()
        if (this.products?.length)
          this.products = [...this.products, { ...product, id }]
        else this.products = [{ ...product, id }]
        return { ...product, id }
      }
    }
  
    updateProduct(id, product) {
      const productToUpdate = this.getProductById(id)
      if (productToUpdate && productToUpdate.id) {
        const filteredProducts = this.products.filter((item) => item.id !== id)
        this.products = [...filteredProducts, { ...productToUpdate, ...product }]
        return { ...productToUpdate, ...product }
      } else {
        const errorAlert = productToUpdate
        return errorAlert
      }
    }
  
    deleteProduct(id) {
      const productToDelete = this.getProductById(id)
      if (productToDelete && productToDelete.id) {
        const filteredProducts = this.products.filter((item) => item.id !== id)
        this.products = filteredProducts
        return "Producto eliminado"
      } else {
        const errorAlert = productToDelete
        return errorAlert
      }
    }
  }
  const productos = new Product()
  
  module.exports = productos