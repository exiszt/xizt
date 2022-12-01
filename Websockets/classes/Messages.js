const fs = require("fs")

class Messages {
  constructor() {
    this.messages = []
  }

  readMessages() {
    try {
      const data = fs.readFileSync("./messages.json")
      this.message = JSON.parse(data)
      return this.message
    } catch (error) {
      throw new Error(error)
    }
  }

  saveMessages(messageToAdd) {
    const { user, message } = messageToAdd
    const date = new Date()
    const second = date.getSeconds()
    const minute = date.getMinutes()
    const hour = date.getHours()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const dateFormat = `${day}/${month}/${year} - ${hour}:${minute}:${second}`

    const newMsg = {user, message, date: dateFormat}

    this.message = [...this.message, newMsg]

    try {
      fs.writeFileSync(
        "./messages.json",
        JSON.stringify(this.message, null, 2)
      )
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = Messages