const express = require('express');
const { trim_all, trim_util } = require('request_trimmer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const loggerMiddleware = require('./middlewares/loggerMiddleware');
const validateJson = require('./middlewares/validateJson');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
//TODO: add npm helmet to secure express app https://www.npmjs.com/package/helmet

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, //Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  })
);
app.use(loggerMiddleware);
app.use(express.json()); //TODO: handling syntax errors
app.use(validateJson);
app.use(trim_all);
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.get('/', (req, res) => {
  req.session.isAuth = true;
  res.send({
    message: 'Backend API',
    session: JSON.stringify(req.session),
  });
});

//routes middleware
app.use('/api', router);

//app.use(errorHandler);

module.exports = app;
