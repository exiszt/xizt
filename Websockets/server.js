const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const handlebars = require("express-handlebars")
const products = require("./classes/Products")
const Messages = require("./classes/Messages")
const router = require("./routes/router")
const PORT = 8080

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))

app.engine("handlebars", handlebars.engine())
app.set("views", "./views")
app.set("view engine", "handlebars")

app.use("/", router)

const instanceMsgs = new Messages()

io.on("connection", (socket) => {
  socket.on("add-product", (product) => {
    console.log(`Producto agregado exitosamente.`)
    products.addProduct(product)
    const allProducts = products.getAllProducts()
    io.sockets.emit(`all-products`, allProducts)
  })

  socket.emit("all-messages", instanceMsgs.readMessages())

  socket.on("add-message", (message) => {
    console.log(`¡Nuevo mensaje!`)
    instanceMsgs.saveMessages(message)
    const allMessages = instanceMsgs.readMessages()
    io.sockets.emit(`all-messages`, allMessages)
  })
})

httpServer.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}!`)
})