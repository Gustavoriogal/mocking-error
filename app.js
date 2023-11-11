const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const flash = require('express-flash')
require('./passportConfig')
const dotenv = require('dotenv');
const WebSocket = require('ws');
const http = require('http');



const app = express();

const server = http.createServer(app);



const wss = new WebSocket.Server({ port: 8081});

wss.on('connection', async (websocket) => {
  console.log('Usuario conectado');

  // Enviar mensajes existentes al usuario cuando se conecta
  try {
    const messages = await Message.find().exec();
    websocket.send(JSON.stringify({ type: 'initialMessages', messages }));
  } catch (error) {
    console.error('Error al obtener mensajes: ' + error);
  }

  websocket.on('message', async (message) => {
    
    const parsedMessage = JSON.parse(message);
    console.log('Mensaje recibido:', parsedMessage);
    // Guardar el mensaje en la base de datos
    try {
      const newMessage = new Message(parsedMessage);
      await newMessage.save();
    } catch (error) {
      console.error('Error al guardar el mensaje: ' + error);
    }

    // Enviar el mensaje a todos los usuarios conectados
    wss.clients.forEach((client) => {
      if (client !== websocket && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'chatMessage', message: parsedMessage }));
      }
    });
  });
});

dotenv.config()


const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING





const store = new MongoDBStore({
  uri: DB_CONNECTION_STRING,
  collection: 'sessions',
});


app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(flash())
// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandlerMiddleware)


mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


/* CONFIGURACION DE DOTENV */




const Product = require('./dao/models/product');
const { createProduct } = require('./dao/repositories/productRepository');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs')

const userRouter = require('./routers/authRouter')
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter');
const { isUser } = require('./middleweres/authMiddlewere');
const { Message } = require('./dao/models/messages');
const routerMock = require('./routers/mocking');
const errorHandlerMiddleware = require('./middleweres/errorMiddlewere');



app.use('/products', productRouter)

app.use('/session', userRouter)

app.use('/api/cart', cartRouter)

app.use("/", routerMock)

app.get('/', (req, res) => {
  res.render('login');
});


// Ruta para la vista del chat
app.get('/chat', isUser, async (req, res) => {
  // Aquí puedes agregar lógica para cargar mensajes anteriores desde la base de datos
  const messages = await Message.find()
  res.render('chat', { user: req.user, messages, isAdmin: req.user.role == 'admin'}); // Renderiza la vista del chat (chat.hbs)
});







app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});





/* createProduct({
    title: 'TV Samsung 52"',
    description: 'Televisor LED de 40 pulgadas de la marca Samsung.',
    price: 499.99, // Precio en dólares, por ejemplo
    code: 'SAMSUNG40',
    stock: 10, // Cantidad en stock
    thumbnail: 'tv-samsung-40.jpg', // Nombre de la imagen en miniatura
  })
 */
/* title: {type: String, required: true},
description: {type: String, required: true}, 
price: {type: Number, required: true},
code: {type: String, required: true},
stock: {type: Number, required: true},
thumbnail: {type: String, required: false},
id: {type: String, required: false} */