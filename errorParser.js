const mongoose = require("mongoose");

function getAllMongooseErrors(error) {
  const errors = Object.keys(error.errors).map(
    (key) => error.errors[key].message
  );
  return errors[0];
}

exports.getErrorMessage = (error) => {
  if (error instanceof mongoose.Error) {
    return getAllMongooseErrors(error);
  } else {
    return error.message;
  }
};
