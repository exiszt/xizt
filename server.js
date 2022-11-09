const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

class Contenedor {
    constructor(name) {
        this.name = name
    }

    async save(item) {
        try {
            let saveData = []
            if (fs.existsSync('./productos.txt')) {
                const currentData = await fs.promises.readFile('./productos.txt', 'utf-8')
                if (currentData !== '') {
                    saveData = JSON.parse(currentData)
                }
            }

            item.id = saveData.length + 1
            saveData.push(item)
            await fs.promises.writeFile('./productos.txt', JSON.stringify(saveData, null, 2))
            return item.title
        }
        catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8')
            const dataJSON = JSON.parse(currentData)
            return dataJSON.find(element => element.id === id) || null
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8')
            return JSON.parse(currentData)
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const currentData = await fs.promises.readFile('./productos.txt', 'utf-8')
            const dataJSON = JSON.parse(currentData)
            const newDataJSON = dataJSON.filter(element => element.id !== id)
            const newIdDataJSON = newDataJSON.map(element => element.id = newDataJSON.indexOf(element) + 1)
            console.log(newIdDataJSON)
            await fs.promises.writeFile('./productos.txt', JSON.stringify(newDataJSON, null, 2))
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            fs.promises.writeFile('./productos.txt', '')
        }
        catch (error) {
            console.log(error)
        }
    }
}

const productos = new Contenedor('./productos.txt')

app.get('/', (req, res) => {
    res.send(`/productos /random`)
})

app.get('/productos', async (req, res) => {
    const showProds = await productos.getAll()
    res.send(showProds)
})

app.get('/random', async (req, res) => {
    const prod = await productos.getAll()
    const randomNum = Math.floor(Math.random() * prod.length)
    res.send(prod[randomNum])
})

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})