const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
require('dotenv').config();

const app = express()
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

let basicApi = require('../routes/basic');
app.use('/api/v1', basicApi)

module.exports = server;