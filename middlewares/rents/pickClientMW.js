/*
* Saves the selected client
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository) => (req, res, next) => {

    req.session.clientId = req.body.clientId;

    next();
};

