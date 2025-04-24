// Helper function for error responses
const sendErrorResponse = (message, statusCode = 400, field = null) => {
  const response = { success: false, message };
  if (field) {
    response.field = field;
  }
  return Response.json(response, { status: statusCode });
};

// Helper function for success responses
const sendSuccessResponse = (message, statusCode = 200, data = {}) => {
  return Response.json(
    { success: true, message, ...data },
    { status: statusCode }
  );
};

export { sendErrorResponse, sendSuccessResponse };
