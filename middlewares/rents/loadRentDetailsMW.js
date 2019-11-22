/*
* Loads rent details from session
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const rentDetails = req.session.rentDetails || {};
    res.locals.rentDetails = {};

    if (typeof rentDetails.startDate !== "undefined") {
        res.locals.rentDetails.startDate = rentDetails.startDate;
    }
    if (typeof rentDetails.endDate !== "undefined") {
        res.locals.rentDetails.endDate = rentDetails.endDate;
    }

    req.session.rentDetails = undefined;

    next();
});

