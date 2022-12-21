const successMessage = {
  status: 200,
  error: null,
  data: {}
};
const errorMessage = {
  status: 500,
  error: null,
};

const DEFAULT_ERROR_MESSAGE = "Operation was not successful";

module.exports = {
  successMessage,
  errorMessage,
  DEFAULT_ERROR_MESSAGE
};