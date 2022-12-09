const express = require("express")
const cors = require("cors")
const prodRouter = require("./routes/productsRoutes")
const cartRouter = require("./routes/cartRoutes")
const app = express()
const PORT = 8080

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 || 201,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/productos", prodRouter)
app.use("/api/carrito", cartRouter)

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT: ${PORT}!`)
)
