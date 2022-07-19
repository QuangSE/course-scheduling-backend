const express = require("express");
const { trim_all, trim_util } = require("request_trimmer");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const validateJson = require("./middlewares/validateJson");
const router = require("./router");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
//TODO: add npm helmet to secure express app https://www.npmjs.com/package/helmet


app.use(loggerMiddleware);
app.use(express.json()); //TODO: handling syntax errors
app.use(validateJson);
// app.use(express.urlencoded({ extended: true }));
app.use(trim_all);

app.get("/", (req, res) => {
  res.send({
    message: "Backend API",
  });
});

app.use("/api", router);

//app.use(errorHandler);

module.exports = app;
