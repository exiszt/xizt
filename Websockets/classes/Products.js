class Product {
    constructor() {this.products}
  
    getAllProducts() {
      if (this.products?.length) return this.products
      else return []
    }
  
    getProductById(id) {
      let message
      if (isNaN(id)) {
        message = "El ID no es válido"
      } else if (this.products?.length) {
        const product = this.products.find((producto) => producto.id === id)
        if (product) return product
      } else message = { error: `El producto no existe` }
      return message
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
  
    addProduct(product) {
      if (product) {
        const id = this.getProductId()
        if (this.products?.length)
          this.products = [...this.products, { ...product, id }]
        else this.products = [{ ...product, id }]
        return { ...product, id }
      }
    }
  
    updateProduct(id, product) {
      const prodToUpdate = this.getProductById(id)
      if (prodToUpdate && prodToUpdate.id) {
        const filteredProducts = this.products.filter((item) => item.id !== id)
        this.products = [...filteredProducts, { ...prodToUpdate, ...product }]
        return { ...prodToUpdate, ...product }
      } else {
        const errorMsg = prodToUpdate
        return errorMsg
      }
    }
  
    deleteProduct(id) {
      const prodToDelete = this.getProductById(id)
      if (prodToDelete && prodToDelete.id) {
        const filteredProducts = this.products.filter((item) => item.id !== id)
        this.products = filteredProducts
        return "Producto eliminado exitosamente"
      } else {
        const errorMsg = prodToDelete
        return errorMsg
      }
    }
  }
  
  const productos = new Product()
  
  module.exports = productos
