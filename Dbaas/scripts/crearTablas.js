import knex from 'knex'
import config from '../src/config.js'

buildProdTable(knex(config.sqlite3))
buildCartTable(knex(config.sqlite3))

async function buildProdTable(sqlClient) {
    try {
        await sqlClient.schema.dropTableIfExists('productos')
        await sqlClient.schema.createTable('productos', table => {
            table.increments('id').primary()
            table.string('title', 50).notNullable()
            table.float('price').notNullable()
            table.string('description', 70).notNullable()
            table.string('thumbnail', 1000)
            table.float('stock').notNullable()
        })
        await sqlClient.destroy()
        console.log('Tabla creada.')
    } catch (error) {
        console.log('Error al crear la tabla.')
        console.log(error)
    }
}

async function buildCartTable(sqlClient) {
    try {
        await sqlClient.schema.dropTableIfExists('carritos')
        await sqlClient.schema.createTable('carritos', table => {
            table.increments('id').primary()
            table.integer('idCart').notNullable()
            table.float('timestamp')
            table.string('creationDate')
            table.string('usuario')
            table.boolean('deleted').defaultTo(false)
        })
        await sqlClient.schema.dropTableIfExists('inCartProds')
        await sqlClient.schema.createTable('inCartProds', table => {
            table.increments('id').primary()
            table.integer('idCart').notNullable()
            table.string('title', 30).notNullable()
            table.float('price').notNullable().notNullable()
            table.string('thumbnail', 1024)
            table.string('description', 50).notNullable()
            table.string('thumbnail', 1024)
            table.float('stock').notNullable()
        })
        await sqlClient.destroy()

        console.log('Tabla creada.')
    } catch (error) {
        console.log('Error al crear la tabla.')
    }
}