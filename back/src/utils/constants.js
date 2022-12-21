const DEFAULT_ERROR_MESSAGE = "Sucedio un error.";
const errorMessage = {
  status: 500,
  error: null
};
const successMessage = {
  status: 200,
  error: null,
  data: {}
};

module.exports = {
  DEFAULT_ERROR_MESSAGE,
  errorMessage,
  successMessage
};