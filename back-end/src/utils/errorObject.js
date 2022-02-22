const errorObject = (message, status) => {
  const err = { message, status, code: 'invalid_data' };
  return (err);
};

module.exports = {
  errorObject,
};
