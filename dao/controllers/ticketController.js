const ticketRepository = require("../repositories/ticketRepository");





exports.generateTicket = async (email, amount) => {
    return await ticketRepository.generateTicket(email, amount)
}