const errorObject = (message, status, hasToken = false) => {
  const err = { message, status, code: 'invalid_data', hasToken };
  return (err);
};

module.exports = {
  errorObject,
};
