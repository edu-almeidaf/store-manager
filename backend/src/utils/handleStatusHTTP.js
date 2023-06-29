const httpStatusMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
};

const handleStatusHTTP = (status) => httpStatusMap[status] || 500;

module.exports = handleStatusHTTP;