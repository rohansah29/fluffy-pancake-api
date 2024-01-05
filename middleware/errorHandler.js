const errorHandler = (err, req, res, next) => {
  
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  module.exports = errorHandler;
  