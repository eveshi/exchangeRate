const ERROR_HANDLING = (req, res, next) => {
  res.status(404).json({
    code: 404,
    type: 'page_not_found',
    message: 'Page Not Found',
  });

  next();
};

module.exports = ERROR_HANDLING;
