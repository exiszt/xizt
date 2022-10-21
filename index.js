class Usuario {
    constructor(
        nombre = "",
        apellido = "",
        libros = [],
        mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName = () => {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota = (nombreMascota = "") => {
        if (nombreMascota === "")
            return console.log("Ingrese el nombre de su mascota")
        this.mascotas.push(nombreMascota)
    }

    countMascotas = () => {
        return this.mascotas.length
    }

    addBook(autorLibro = "", tituloLibro = "") {
        if (tituloLibro === "")
        return console.log("Ingrese el titulo del libro")
        this.libros.push({ autor: autorLibro, titulo: tituloLibro })
    }

    getBookNames = () => {
        let bookTitles = this.libros.map((book) => {
            return book.titulo
        })
        return bookTitles
    }
}

const testUsuario = new Usuario(
    "John",
    "Doe",
    [
        {
            autor: "Arthur Conan Doyle",
            titulo: "Las aventuras de Sherlock Holmes"
        },
        {
            autor: "Julio Verne",
            titulo: "La vuelta al mundo en ochenta días",
        },
        {
            autor: "Platón",
            titulo: "Diálogos"
        }
    ],
    [
        "Ian",
        "Robert",
        "Moz"
    ]
)

console.log(`[Nombre completo] \n${testUsuario.getFullName()}`)

testUsuario.addMascota("Siouxsie")
console.log(`[Mascotas] \n${testUsuario.mascotas}`)

console.log(`[Cantidad] \n${testUsuario.countMascotas()}`)

testUsuario.addBook("Gustavo Adolfo Bécquer", "Rimas")
console.log(`[Libros] \n${testUsuario.getBookNames()}`)