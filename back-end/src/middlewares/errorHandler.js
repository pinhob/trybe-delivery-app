module.exports = (error, _req, res, _next) => {
  const { status, message } = error;
  if (message) {
    console.log(`errorHandler: ${error}`);
    console.log(`errorHandler: ${status}`);
    console.log(`errorHandler: ${message}`);
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
