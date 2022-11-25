const express = require('express')
const router = require('./routes/productos')
const PORT = 8060
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/', router)

const server = app.listen(PORT, () =>{
    console.log(`[ PUG ] Server running on port: ${PORT}!`)
}) 