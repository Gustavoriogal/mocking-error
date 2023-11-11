const mongoose = require('mongoose')


const messagesSchema = new mongoose.Schema({
    user: {type: String, required: true},
    message: {type: String, required: true}
})


const Message = mongoose.model('Message', messagesSchema)


module.exports = {Message}