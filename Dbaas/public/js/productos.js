const apiProds = {
    get: () => {
        return fetch('/api/productos')
            .then(data => data.json())
    },
    post: (newProd) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProd)
        }
        return fetch('/api/productos', options)
    },
    put: (idProd, newProd) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(newProd),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return fetch(`/api/productos/${idProd}`, options)
    },
    delete: (idProd) => {
        const options = {
            method: 'DELETE'
        }
        return fetch(`/api/productos/${idProd}`, options)
    },
}

updateProdList()

const addProdForm = document.getElementById('addProdForm')
addProdForm.addEventListener('submit', e => {
    e.preventDefault()
    const producto = readFormProd()
    apiProds.post(producto)
        .then(updateProdList)
        .then(() => {
            addProdForm.reset()
        })
        .catch((error) => {
            alert(error.message)
        })
})

function readFormProd() {
    const producto = {
        title: addProdForm[0].value,
        price: addProdForm[1].value,
        thumbnail: addProdForm[2].value
    }
    return producto
}

function updateProdList() {
    return apiProds.get()
        .then(prods => buildTable(prods))
        .then(html => {
            document.getElementById('productos').innerHTML = html
        })
}

function deleteProd(idProd) {
    apiProds.delete(idProd)
        .then(updateProdList)
}

function updateProd(idProd) {
    const newProd = readFormProd()
    apiProds.put(idProd, newProd)
        .then(updateProdList)
}

function completeForm(title = '', price = '', thumbnail = '') {
    addProdForm[0].value = title
    addProdForm[1].value = price
    addProdForm[2].value = thumbnail
}

function buildTable(productos) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

    if (productos.length > 0) {
        html += `
        <h2>Lista de productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                </tr>`
        for (const prod of productos) {
            html += `
                    <tr>
                    <td><a type="button" onclick="completeForm('${prod.title}', '${prod.price}','${prod.thumbnail}')" title="copiar a formulario...">${prod.title}</a></td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td><a type="button" onclick="deleteProd('${prod.id}')">borrar</a></td>
                    <td><a type="button" onclick="updateProd('${prod.id}')">actualizar</a></td>
                    </tr>`
        }
        html += `
            </table>
        </div >`
    }
    return Promise.resolve(html)
}
