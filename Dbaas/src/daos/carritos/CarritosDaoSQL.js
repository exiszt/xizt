import ContenedorSQL from "../../contenedores/ContenedorSQL.js"

class CarritosDaoSQL {

    constructor(configCarritos, configProds) {
        this.carritos = new ContenedorSQL(configCarritos, 'carritos')
        this.inCartProds = new ContenedorSQL(configProds, 'inCartProds')
    }

    async guardar(carrito = {}) {
        const result = await this.carritos.guardar(carrito)
        result.productos = []
        return result
    }

    async listar(_idCarrito) {
        const idCart = Number(_idCarrito)
        await this.carritos.listar(idCart)
        const result = {
            id: idCart,
            productos: []
        }
        const inCartProds = await this.inCartProds.listarAll({ idCart })
        for (const prod of inCartProds) {
            delete prod.idCart
            result.productos.push(prod)
        }
        return result
    }

    async actualizar(carrito) {
        carrito.id = Number(carrito.id)
        await this.inCartProds.borrarAll({ idCart: carrito.id })
        const inserts = carrito.productos.map(p => {
            return this.inCartProds.guardar({
                ...p,
                idCart: carrito.id
            })
        })
        return Promise.allSettled(inserts)
    }

    async borrar(_idCarrito) {
        const idCart = Number(_idCarrito)
        const result = await Promise.allSettled([
            this.inCartProds.borrarAll({ idCart }),
            this.carritos.borrar(idCart)
        ])
        return result
    }

    borrarAll() {
        return Promise.allSettled([
            this.carritos.borrarAll(),
            this.inCartProds.borrarAll()
        ])
    }

    async listarAll() {
        const carritosIds = await this.carritos.listarAll()
        const carritosMap = new Map()
        for (const obj of carritosIds) {
            carritosMap.set(obj.id, {
                id: obj.id,
                productos: []
            })
        }
        const inCartProds = await this.inCartProds.listarAll()
        for (const prod of inCartProds) {
            if (carritosMap.has(prod.idCart)) {
                carritosMap.get(prod.idCart).productos.push(prod)
            }
        }
        return [...carritosMap.values()]
    }
}

export default CarritosDaoSQL