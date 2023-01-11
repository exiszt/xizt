import app from './server.js'

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${server.address().port}!`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))