

const cors = require('cors');

const express = require('express');
const path = require('path');
// const {config} = require('./configs/configEnvSchema');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
/**
 * Create HTTP server.
 */
const server = http.createServer(app);


const options = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const MONGODB_URI = `mongodb://localhost:27017/iws-beauty-final`;
mongoose.connect(MONGODB_URI, options);


const corsOptions = {
    origin: '*',
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
        'Origin',
        'Content-Type',
        'Accept',
        'x-access-token',
        'x-auth-token',
        'x-xsrf-token',
        'authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", async (request, response) => {
    response.send("Ok!")
});



app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true,
}));
app.use(cookieParser());


const productsRoute = require('./routes/ProductsRoute');
const commentsRoute = require('./routes/CommentsRoute');
const usersRoute = require('./routes/UsersRoute');
const cartsRoute = require('./routes/CartsRoute');
const ordersRoute = require('./routes/OrdersRoute');

app.use('/', usersRoute);
app.use('/', productsRoute);
app.use('/', commentsRoute);
app.use('/', cartsRoute);
app.use('/', ordersRoute);


server.listen(5000, () => {
    console.log(`App is listening at 5000`);
});
module.exports = app;
