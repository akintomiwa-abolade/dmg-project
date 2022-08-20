const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express()
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

// swagger configuration
const swaggerDefinition = {
    info: {
        title: 'DMG Media Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test the routes',
    },
    host: 'localhost:5000',
    basePath: '/',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
let basicApi = require('./routes/basic');
app.use('/api/v1', basicApi)

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('listening on port 5000')
})

module.exports = server;