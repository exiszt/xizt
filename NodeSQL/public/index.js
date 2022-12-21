const socket = io();

const title = document.getElementById("title");
const price = document.getElementById("price");
const thumb = document.getElementById("thumb");
const mail = document.getElementById("mail");
const message = document.getElementById("message");

function addProduct(e) {
  const productToAdd = {
    title: title.value,
    price: price.value,
    thumb: thumb.value,
  };
  socket.emit("add-product", productToAdd);
  return false;
}

socket.on("show-all-products", (products) => {
  const table = document.getElementById("sockets-table");
  const tableRows = document.getElementById("table");
  const text = document.getElementById("no-products-text");
  if (!products.length) {
    table.style.display = "none";
    text.style.display = "block";
    return;
  }
  table.style.display = "block";
  text.style.display = "none";
  const tableElements = products
    .map(({ id, title, price, thumb }) => {
      return `
        <tr key=${id}>
          <td scope="col">${title}</td>
          <td scope="col">$${price}</td>
          <td scope="col"><img src=${thumb} style='width:30px' /></td>
        </tr>`;
    })
    .join(" ");

  tableRows.innerHTML = tableElements;
  title.value = "";
  price.value = "";
  thumb.value = "";
});

function addMessage(e) {
  const newMessage = {
    message: message.value,
    user: mail.value,
  };
  socket.emit("add-message", { ...newMessage });
  return false;
}

function renderMessages(messages) {
  const messageContainer = document.getElementById("messages");
  if (messages.length) {
    const messageItems = messages
      .map(({ user, message, date }) => {
        return `<p style="color: brown"><strong class="text-primary">${user}</strong>
      [${date}]: <span class="text-success">${message}</span></p>`;
      })
      .join(" ");
    messageContainer.innerHTML = messageItems;
    mail.value = "";
    message.value = "";
  }
}

socket.on("show-all-messages", (messages) => {
  renderMessages(messages);
});
