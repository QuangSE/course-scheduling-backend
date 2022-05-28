const logger = require("./logger");
const errNames = require("./constants/errorNames");

function InvalidParameterError(tableName, id) {
  this.name = errNames.InvalidParameterError;
  this.message = `A '${tableName}' with ID '${id}' does not exist`;
  this.stack = this.name + ": " + this.message + ", " + this.stack
}

InvalidParameterError.prototype = new Error();

function InvalidReqBodyError(
  message = "Request body must be of 'Content-Type: application/json' and cannot be empty"
) {
  this.name = errNames.InvalidReqBodyError;
  this.message = message;
  this.stack = this.name + ": " + this.message + ", " + this.stack

}

InvalidReqBodyError.prototype = new Error();

module.exports = { InvalidReqBodyError, InvalidParameterError };
