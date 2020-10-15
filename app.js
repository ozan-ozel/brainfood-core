require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router();
const routes = require('./routes/index.js')

const app = express()
const port = process.env.PORT || 3000

/**
 * Express Configuration
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// disable in production
if(process.env.NODE_ENV === "dev")
  app.use(cors())

app.use('/api/v1', routes(router))

if(process.env.NODE_ENV !== 'test')
  app.listen(port, () => console.log(`BrainFood listening at http://localhost:${port}`))

module.exports = app;
