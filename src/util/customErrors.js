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

function InvalidUsernameError(username) {
  this.name = errNames.InvalidUsernameError;
  this.message = `A 'user' with username '${username}' does not exist`;
  this.stack = this.name + ": " + this.message + ", " + this.stack
}
InvalidUsernameError.prototype = new Error();

function WrongPasswordError(username) {
  this.name = errNames.WrongPasswordError;
  this.message = `Password does not match with username '${username}`;
  this.stack = this.name + ": " + this.message + ", " + this.stack
}
WrongPasswordError.prototype = new Error();

function InvalidTokenError(status = 403, message = "Access token expired") {
  this.status = status;
  this.name = errNames.InvalidTokenError;
  this.message = message;
  this.stack = this.name + ": " + this.message + ", " + this.stack
}
InvalidTokenError.prototype = new Error();


module.exports = { InvalidReqBodyError, InvalidParameterError, InvalidUsernameError, WrongPasswordError, InvalidTokenError  };
