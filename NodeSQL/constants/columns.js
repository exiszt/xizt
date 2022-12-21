productsColumns = [
  { type: "increments", name: "id" },
  { type: "string", name: "title" },
  { type: "integer", name: "price" },
  { type: "string", name: "thumb" },
];

messageColumns = [
  { type: "increments", name: "id" },
  { type: "string", name: "mail" },
  { type: "string", name: "message" },
  { type: "string", name: "date" },
];

module.exports = { productsColumns, messageColumns };
