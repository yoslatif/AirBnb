const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();


app.use(morgan('dev'));


app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
    app.use(cors());
  }
  

  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );


  // TODO: Add your routes here

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
  });


module.exports = app;
