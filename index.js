const Contenedor = require('./contenedor.js')

const album1 = {
    title:'The Beatles - Abbey Road (1969) vinilo',
    price: 10000,
    thumbnail: 'https://e.snmc.io/i/600/w/556a5058d86284041d4ac0852ce0a23b/6617288/the-beatles-abbey-road-Cover-Art.jpg',
}

const album2 = {
    title:'King Crimson - Red (1974) vinilo',
    price: 10000,
    thumbnail: 'https://e.snmc.io/i/600/w/20bf069dfcf00dd63ec64f8288db7de0/2601521/king-crimson-red-Cover-Art.jpg'
}

const album3 = {
    title:'Talking Heads - Remain in Light (1980) vinilo',
    price: 10000,
    thumbnail: 'https://e.snmc.io/i/600/w/095ff661d204890c23511eaefd13d75d/5627825/talking-heads-remain-in-light-Cover-Art.jpg'
}

const album4 = {
    title:'The Cure - The Head on the Door (1985) vinilo',
    price: 10000,
    thumbnail: 'https://e.snmc.io/i/600/w/50fe5a102e7f94e45b862ecaef2e76f1/2666043/the-cure-the-head-on-the-door-Cover-Art.jpg'
}

const lista = new Contenedor('Productos')

const main = async () => {
    // Guardar todos los productos
        // console.log(await lista.save(album1))
        // console.log(await lista.save(album2))
        // console.log(await lista.save(album3))
        // console.log(await lista.save(album4))

    // Consultar todos los productos
        // console.log(await lista.getAll())

    // Consultar al producto con ID 4
        // console.log(await lista.getById(4))
    
    // Borrar el producto con ID 4
        // console.log(await lista.deleteById(4))
    
    // Borrar todos los productos
        // console.log(await lista.deleteAll())
}

main()