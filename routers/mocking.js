const express = require("express")
const { productsMock } = require("../mocking")

const routerMock = express.Router()


routerMock.get("/mockingProducts", (req, res) =>{



    res.json(productsMock)
})


module.exports = routerMock