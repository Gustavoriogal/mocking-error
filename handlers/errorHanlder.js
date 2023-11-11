
  

const ERRORS = {

    INTERNAL_SERVER_ERROR: {
        message: "Error interno del servidor",
        status: 500
    },
    GENERATE_TICKET_ERROR:{
        message: "No se pudo procesar la compra",
        status: 500
    },
    PRODUCT_NOT_FOUND: {
        message: "Producto no encontrado",
        status: 404
    },
    CART_NOT_FOUND: {
        message: "Carrito no encontrado",
        status: 404
    },
    NOT_STOCK: {
        message: "No hay suficiente stock para ese producto",
        status: 400
    }
}

module.exports = ERRORS