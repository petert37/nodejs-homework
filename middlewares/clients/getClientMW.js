/*
* Loads the client with the specified id from the database
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository) => (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");
    res.locals.clientInstance = ClientModel.getClient(req.params.clientId);

    next();
};

