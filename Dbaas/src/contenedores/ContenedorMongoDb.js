import mongoose from 'mongoose'
import config from '../config.js'
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'


mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {
    constructor(collectionName, esquema) {
        this.coleccion = mongoose.model(collectionName, esquema)
    }
    
    async listar(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            if (docs.length = 0) {
                throw new Error('No se encontró el producto')
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id')
                return result
            }
        } catch (error) {
            throw new Error(`Error al buscar el producto. ${error}`)
        }
    }

    async listarAll() {
        try {
            let docs = await this.coleccion.find({}).lean()
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
        } catch (error) {
            throw new Error(`Error al listar. ${error}`)
        }
    }

    async guardar(newElement) {
        try {
            let doc = await this.coleccion.create(newElement);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        } catch (error) {
            throw new Error(`Error al guardar. ${error}`)
        }
    }

    async actualizar(newElement) {
        try {
            renameField(newElement, 'id', '_id')
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': newElement._id }, newElement)
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar.')
            } else {
                renameField(newElement, '_id', 'id')
                removeField(newElement, '__v')
                return asPOJO(newElement)
            }
        } catch (error) {
            throw new Error(`Error al actualizar. ${error}`)
        }
    }

    async borrar(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar.')
            }
        } catch (error) {
            throw new Error(`Error al borrar. ${error}`)
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar. ${error}`)
        }
    }
}

export default ContenedorMongoDb