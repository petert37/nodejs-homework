module.exports = function wrapAsync(fn) {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};