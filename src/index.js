const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Yey, your server is running on port " + port);
});
