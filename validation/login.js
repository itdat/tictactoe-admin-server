const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.name = "Username field is required";
  }

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.name = "Username must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Password must have 2 char";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
