// Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones:
// mensajes y productos.

use ecommerce

db.createCollection('productos')
db.createCollection('mensajes')

show collections

// 1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos.
// El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el
// entregable con base de datos MariaDB.
// 2) Definir las claves de los documentos en relación a los campos de las tablas de esa base.
// En el caso de los productos, poner valores al campo de precio entre los 100 y 5000 pesos
// (eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).  
db.productos.insertOne({"title": "Arcade Fire - Funeral", "price": 120, "thumb": "img1"})
db.productos.insertOne({"title": "Godspeed You! Black Emperor - Lift Yr. Skinny Fists Like Antennas to Heaven!", "price": 580, "thumb": "img2"})
db.productos.insertOne({"title": "Radiohead - OK Computer", "price": 900, "thumb": "img3"})
db.productos.insertOne({"title": "My Bloody Valentine - Loveless", "price": 1280, "thumb": "img4"})
db.productos.insertOne({"title": "The Cure - Disintegration", "price": 1700, "thumb": "img5"})
db.productos.insertOne({"title": "Talking Heads - Remain In Light", "price": 2300, "thumb": "img6"})
db.productos.insertOne({"title": "Fleetwood Mac - Rumours", "price": 2860, "thumb": "img7"}) 
db.productos.insertOne({"title": "Pink Floyd - The Dark Side of the Moon", "price": 3350, "thumb": "img8"})
db.productos.insertOne({"title": "King Crimson - In the Court of the Crimson King", "price": 4320, "thumb": "img9"})
db.productos.insertOne({"title": "The Beatles - Revolver", "price": 4990, "thumb": "img10"})

db.mensajes.insertMany([
    {"mail": "mailUno@test.com", "message": "msg1"},
    {"mail": "mailDos@test.com", "message": "msg2"},
    {"mail": "mailTres@test.com", "message": "msg3"},
    {"mail": "mailCuatro@test.com", "message": "msg4"},
    {"mail": "mailCinco@test.com", "message": "msg5"},
    {"mail": "mailSeis@test.com", "message": "msg6"},
    {"mail": "mailSiete@test.com", "message": "msg7"},
    {"mail": "mailOcho@test.com", "message": "msg8"},
    {"mail": "mailNueve@test.com", "message": "msg9"},
    {"mail": "mailDiez@test.com", "message": "msg10"}
    ])

// 3) Listar todos los documentos en cada colección.     
db.productos.find()
db.mensajes.find()

// 4) Mostrar la cantidad de documentos almacenados en cada una de ellas.  
db.productos.countDocuments()
db.mensajes.countDocuments()

// 5) Realizar un CRUD sobre la colección de productos:

    // A) Agregar un producto más en la colección de productos
    db.productos.insertOne({"title": "The Beach Boys - Pet Sounds", "price": 5000, "thumb": "img11"})

    // B) Realizar una consulta por nombre de producto específico:

        // I) Listar los productos con precio menor a 1000 pesos.
        db.productos.find({"price": {$lt: 1000}})

        // II) Listar los productos con precio entre los 1000 a 3000 pesos.
        db.productos.find({$and: [{"price": {$gt: 1000}}, {"price": {$lt: 3000}}]})

        // III) Listar los productos con precio mayor a 3000 pesos.
        db.productos.find({"price": {$gt: 3000}})

        // IV) Realizar una consulta que traiga solo el nombre del tercer producto más barato.
        db.productos.find({}, { "title": 1, "_id": 0 }).sort({ "price": 1 }).skip(2).limit(1)

    // C) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100
    db.productos.updateMany({}, {$set: {"stock": 100}})

    // D) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
    db.productos.updateMany({"price": {$gt: 4000}}, {$set: {"stock": 0}})

    // E) Borrar los productos con precio menor a 1000 pesos
    db.productos.deleteMany({"price": {$lt: 1000}})

// 6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
use admin
db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{role: "read", db: "ecommerce"}],
})

// Verificar que pepe no pueda cambiar información
db.productos.insertOne({ prueba: "prueba" })