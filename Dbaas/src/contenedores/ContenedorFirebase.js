import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: 'https://coder32195c20.firebaseio.com'
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(collectionName) {
        this.coleccion = db.collection(collectionName)
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por ID.`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error al listar por ID. ${error}`)
        }
    }

    async listarAll() {
        try {
            const result = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar: ${error}`)
        }
    }

    async guardar(newElement) {
        try {
            const saved = await this.coleccion.add(newElement);
            return { ...newElement, id: saved.id }
        } catch (error) {
            throw new Error(`Error al guardar. ${error}`)
        }
    }

    async actualizar(newElement) {
        try {
            const updated = await this.coleccion.doc(newElement.id).set(newElement);
            return updated
        } catch (error) {
            throw new Error(`Error al actualizar. ${error}`)
        }
    }

    async borrar(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('Error al vaciar.')
            }
        } catch (error) {
            throw new Error(`Error al vaciar. ${error}`)
        }
    }

    async desconectar() {
    }
}

export default ContenedorFirebase