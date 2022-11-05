const http = require('http')

const getMensaje = () => {
    const horaActual = new Date().getHours()
    if (horaActual >= 6 && horaActual <= 12) {
        return ('Buenos días')
    }
    else if(horaActual >= 13 && horaActual <=19){
        return ('Buenas tardes')
    }
    else{
        return ('Buenas noches')
    }
}

const server = http.createServer((peticion, respuesta) => {
    // respuesta.end('Hola desde el back')
    respuesta.end(getMensaje())
})

const connectedServer = server.listen(8080, () => {
    console.log(`Server http escuchando en el puerto 8080`)
})