const { default: constants } = require("./constants");

module.exports.default = function errorHandler(error, res) {
  console.warn(error);
  if (error.isAxiosError) {
    return res.status(404).send(constants.MESSAGE_404);
  }
  res.status(500).send(constants.MESSAGE_500);
};
