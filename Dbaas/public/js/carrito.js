const apiProds = {
    get: () => {
        return fetch('/api/productos')
        .then(data => data.json())
    }
}

const apiCarts = {
    createCart: () => {
        const options = { method: "POST" }
        return fetch('/api/carritos', options)
        .then(data => data.json())
    },
    getIds: () => {
        return fetch('/api/carritos')
        .then(data => data.json())
    },
    postProd: (idCart, idProd) => {
        const data = { id: idProd }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(`/api/carritos/${idCart}/productos`, options)
    },
    getProds: idCart => {
        return fetch(`/api/carritos/${idCart}/productos`)
            .then(data => data.json())
    },
    deleteProd: (idCart, idProducto) => {
        const options = {
            method: 'DELETE',
        }
        return fetch(`/api/carritos/${idCart}/productos/${idProducto}`, options)
    }
}

loadProdPack()
loadCartPack()

document.getElementById('btnAddToCart').addEventListener('click', () => {
    const idCart = document.getElementById('cartsPack').value
    const idProd = document.getElementById('prodsPack').value
    if (idCart && idProd) {
        addToCart(idCart, idProd)
    } else {
        alert('Por favor, seleccione un carrito y un producto.')
    }
})

document.getElementById('btnCreateCart').addEventListener('click', () => {
    apiCarts.createCart()
        .then(({ id }) => {
            loadCartPack().then(() => {
                const pack = document.getElementById('cartsPack')
                pack.value = `${id}`
                pack.dispatchEvent(new Event('change'));
            })
        })
})

document.getElementById('cartsPack').addEventListener('change', () => {
    const idCart = document.getElementById('cartsPack').value
    updateCartList(idCart)
})

function addToCart(idCart, idProducto) {
    return apiCarts.postProd(idCart, idProducto).then(() => {
        updateCartList(idCart)
    })
}

function removeFromCart(idProducto) {
    const idCart = document.getElementById('cartsPack').value
    return apiCarts.deleteProd(idCart, idProducto).then(() => {
        updateCartList(idCart)
    })
}

function updateCartList(idCart) {
    return apiCarts.getProds(idCart)
        .then(prods => buildTable(prods))
        .then(html => {
            document.getElementById('carrito').innerHTML = html
        })
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
        <h2>Lista</h2>
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
                    <td>${prod.title}</td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td><a type="button" onclick="removeFromCart('${prod.id}')">borrar</a></td>
                    </tr>`
        }
        html += `
            </table>
        </div >`
    } else {
        html += `<br><h4>Cart vacío</h2>`
    }
    return Promise.resolve(html)
}

function setInitials(leyenda) {
    const defaultItem = document.createElement("option")
    defaultItem.value = ''
    defaultItem.text = leyenda
    defaultItem.hidden = true
    defaultItem.disabled = true
    defaultItem.selected = true
    return defaultItem
}

function loadProdPack() {
    return apiProds.get()
        .then(productos => {
            const pack = document.getElementById('prodsPack');
            pack.appendChild(setInitials('Seleccione un producto.'))
            for (const prod of productos) {
                const itemPack = document.createElement("option");
                itemPack.value = prod.id;
                itemPack.text = prod.title;
                pack.appendChild(itemPack);
            }
        })
}

function emptyPack(pack) {
    while (pack.childElementCount > 0) {
        pack.remove(0)
    }
}

function loadCartPack() {
    return apiCarts.getIds()
        .then(ids => {
            const pack = document.getElementById('cartsPack');
            emptyPack(pack)
            pack.appendChild(setInitials('Seleccione un cart.'))
            for (const id of ids) {
                const itemPack = document.createElement("option");
                itemPack.value = id;
                itemPack.text = id;
                pack.appendChild(itemPack);
            }
        })
}