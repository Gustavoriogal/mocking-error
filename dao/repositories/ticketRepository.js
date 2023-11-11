const Ticket = require("../models/ticket");

function generateUniqueCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8; // Longitud del código
  
    let uniqueCode = '';
    const datePart = Date.now().toString(36); // Representa la fecha actual en base 36
  
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueCode += characters[randomIndex];
    }
  
    return datePart + uniqueCode;
  }

class TicketService{
    async generateTicket (email, amount) {
        const ticket = new Ticket({
            code: generateUniqueCode(), // Implementa una función para generar un código único
            purchase_datetime: new Date(),
            amount: amount,
            purchaser: email,
          });
      
          // Guarda el ticket en la base de datos
          await ticket.save();
    }
}


module.exports = new TicketService()