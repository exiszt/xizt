import { promises as fs } from 'fs'
import config from '../config.js'

class ContenedorArchivo {

    constructor(route) {
        this.route = `${config.fileSystem.path}/${route}`;
    }

    async listar(id) {
        const objs = await this.listarAll()
        const search = objs.find(o => o.id == id)
        return search
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.route, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async guardar(obj) {
        const objs = await this.listarAll()
        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            await fs.writeFile(this.route, JSON.stringify(objs, null, 2))
            return newObj
        } catch (error) {
            throw new Error(`Error al guardar. ${error}`)
        }
    }

    async actualizar(elem) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar. ID no encontrado. ${id}`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.route, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar. ${error}`)
            }
        }
    }

    async borrar(id) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar. ID no encontrado. ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.route, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar. ${error}`)
        }
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.route, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al vaciar. ${error}`)
        }
    }
}

export default ContenedorArchivo