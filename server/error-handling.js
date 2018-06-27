const ERROR_HANDLING = (err, req, res, next) => {
  if (err.state === 400) {
    res.status(400).json({
      code: 400,
      type: 'bad_requst',
      message: 'Bad Request',
    });
  }

  if (err.state === 500) {
    res.status(500).json({
      code: 500,
      type: 'server_error',
      message: 'Server Errors',
    });
  }

  next();
};

module.exports = ERROR_HANDLING;
