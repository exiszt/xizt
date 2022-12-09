const express = require("express")
const { Router } = express
const products = require("../classes/Products")
const isAdmin = require("../login/login")

const router = Router()

router.get("/", async (req, res) => {
  const response = await products.getAllProds()
  res.status(response.code).send(response)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const response = await products.getProdByID(Number(id))
  res.status(response.code).send(response)
})

router.post("/", async (req, res) => {
  if (isAdmin) {
    const product = req.body
    const response = await products.loadProd(product)
    res.status(response.code).send(response)
  } else {
    res.send({
      error: -1, descripcion: `Acceso denegado a ruta "/", (POST).`,
    })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (isAdmin) {
    const updatedProd = req.body
    const response = await products.updateProd(Number(id), updatedProd)
    res.status(response.code).send(response)
  } else {
    res.send({
      error: -1,
      descripcion: `Acceso denegado a ruta "/${id}".`,
    })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (isAdmin) {
    const response = await products.deleteByID(Number(id))
    console.log(response)
    res.status(response.code).send(response)
  } else {
    res.send({
      error: -1,
      descripcion: `Acceso denegado a ruta "/${id}".`,
    })
  }
})

router.get("*", (req, res) => {
  console.log(req.headers.url)
  res.send({
    error: -2,
    descripcion: `Ruta "${req.url}" (GET) no implementada.`,
  })
})

module.exports = router