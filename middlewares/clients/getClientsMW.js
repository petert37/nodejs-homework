/*
* Loads the list of clients from the database
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository) => (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");
    res.locals.clients = ClientModel.getClients();

    next();
};

