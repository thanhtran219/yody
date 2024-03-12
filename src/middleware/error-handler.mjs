// 500 Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error!');
};

// 404 Middleware
const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
};

export { errorHandler, notFoundMiddleware };
