function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        msg: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
}

module.exports = errorHandler;