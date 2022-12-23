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

const USER_TYPES = {
  TOURIST: "tourist",
  RECEPTIONIST: "receptionist",
  ADMIN: "admin"
};

module.exports = {
  successMessage,
  errorMessage,
  DEFAULT_ERROR_MESSAGE,
  USER_TYPES
};