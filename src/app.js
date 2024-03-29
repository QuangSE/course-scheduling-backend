const express = require('express');
const { trim_all } = require('request_trimmer');
const cors = require('cors');
const cookieSession = require('cookie-session');

const loggerMiddleware = require('./middlewares/loggerMiddleware');
const validateJson = require('./middlewares/validateJson');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
//TODO: add npm helmet to secure express app https://www.npmjs.com/package/helmet

app.use(
  cors({
    origin: 'https://localhost:3000',
    credentials: true, //Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  })
);
app.use(loggerMiddleware);
app.use(express.json());
app.use(validateJson);
app.use(trim_all);
app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    maxAge: 12 * 60 * 60 * 1000,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  })
);

app.get('/', (req, res) => {
  res.send({
    message: 'Backend API',
    session: JSON.stringify(req.session),
  });
});

//routes middleware
app.use('/api-v1.0', router);

module.exports = app;
