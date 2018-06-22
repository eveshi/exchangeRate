const ERROR_HANDLING = (err, req, res, next) => {
  if (err.state === 404) {
    res.status(404).json({
      code: 404,
      type: 'page_not_found',
      message: 'Page Not Found',
    });
  }

  next();
};

module.export = ERROR_HANDLING;
