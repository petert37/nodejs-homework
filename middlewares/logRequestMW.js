module.exports = function logRequest(req, res, next) {
    let body = "BINARY";
    const contentType = req.header("content-type");
    if (!contentType || contentType.toLowerCase().indexOf("multipart/form-data") === -1) {
        body = JSON.stringify(req.body);
    }
    console.log(`${req.method.toUpperCase()} ${req.url} Q: ${JSON.stringify(req.query)} B: ${body}`);
    next();
};