// Helper function for success responses
const sendErrorResponse = (message, statusCode) => {
  return Response.json({ success: false, message }, { status: statusCode });
};

// Helper function for error responses
const sendSuccessResponse = (message, statusCode) => {
  return Response.json({ success: true, message }, { status: statusCode });
};

export { sendErrorResponse, sendSuccessResponse };
