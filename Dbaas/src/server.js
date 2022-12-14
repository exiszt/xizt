import express from 'express'
const { Router } = express

// Configuraciones para que funcione el dirname
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
    productosDao as apiProds,
    carritosDao as apiCarts
} from './daos/index.js'

//------------------------------------------------------------------------
// instancio servidor

const app = express()

//--------------------------------------------
// permisos de administrador

const esAdmin = true

function crearErrorNoEsAdmin(route, metodo) {
    const error = {
        error: -1,
    }
    if (route && metodo) {
        error.descripcion = `route '${route}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productos = await apiProds.listarAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await apiProds.listar(req.params.id))
})

productosRouter.post('/', soloAdmins, async (req, res) => {
    res.json(await apiProds.guardar(req.body))
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    res.json(await apiProds.actualizar(req.body))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await apiProds.borrar(req.params.id))
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    res.json((await apiCarts.listarAll()).map(c => c.id))
})

carritosRouter.post('/', async (req, res) => {
    res.json(await apiCarts.guardar())
})

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await apiCarts.borrar(req.params.id))
})

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await apiCarts.listar(req.params.id)
    res.json(carrito.productos)
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await apiCarts.listar(req.params.id)
    const producto = await apiProds.listar(req.body.id)
    carrito.productos.push(producto)
    await apiCarts.actualizar(carrito)
    res.end()
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carrito = await apiCarts.listar(req.params.id)
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await apiCarts.actualizar(carrito)
    }
    res.end()
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/productos', async (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/productos.html'))
})
app.get('/carrito', async (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/carrito.html'))
})

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

export default app