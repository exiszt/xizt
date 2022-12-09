const express = require("express")
const carts = require("../classes/Cart")
const status200 = require("../help")
const { Router } = express
const router = Router()

router.post("/", async (req, res) => {
  const newIDCart = carts.generateCartID()
  const cart = {id: newIDCart, products: [], timestamp: Date.now(),}
  const response = await carts.createCart(cart)
  res
    .status(response.code)
    .send(status200(response.code)
    ? newIDCart
    : response
    )
})

router.post("/guardar-carrito", async (req, res) => {
  const cart = req.body
  const response = await carts.addCart(cart)
  res.status(response.code).send(response)
})

router.delete("/:id", async (req, res) => {
  const IDCart = req.params.id
  const response = await carts.deleteCartByID(IDCart)
  res.status(response.code).send(response)
})

router.get("/:id/productos", async (req, res) => {
  const id = req.params.id
  const response = await carts.getAllProdsInCart(id)
  res.status(response.code).send(response.data
    ? response.data
    : response
    )
})

router.get("/", async (req, res) => {
  const response = await carts.getAllCarts()
  res.status(response.code).send(response)
})

router.post("/:id/productos", async (req, res) => {
  const IDCart = req.params.id
  const product = req.body
  const response = await carts.addProdToCart(IDCart, product)
  res.status(response.code).send(response)
})

router.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params
  const response = await carts.deleteCartProd(id, id_prod)
  res.status(response.code).send(response)
})

router.get("*", (req, res) => {
  console.log(req.headers.url)
  res.send({error: -2, descripcion: `Ruta "${req.url}" (GET) no implementada.`,
  })
})

module.exports = router