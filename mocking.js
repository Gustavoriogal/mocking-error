const {faker} = require('@faker-js/faker')

// Función para generar un producto con datos aleatorios
const generateMockProduct = () => {
  return {
    _id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.datatype.number({ min: 10, max: 100 }),
    stock: faker.datatype.number({ min: 1, max: 100 }),
    // Otros campos de producto si los tienes
  };
};

const productsMock = Array.from({ length: 100 }, generateMockProduct);

module.exports = { productsMock };
