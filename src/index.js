const express = require('express')
const router = require('./products.js')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', router)
app.use(express.static("public"))

const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))
server.on('error', error => console.log(`Error en el servidor: ${error}`))