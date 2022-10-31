const fs = require('fs')

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
            return dataJSON.find(element => element.id === id) ?? null
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

module.exports = Contenedor