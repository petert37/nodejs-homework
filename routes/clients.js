const express = require("express");

const renderMW = require("../middlewares/renderMW");
const redirectMW = require("../middlewares/redirectMW");
const getClientMW = require("../middlewares/clients/getClientMW");
const getClientsMW = require("../middlewares/clients/getClientsMW");
const saveClientMW = require("../middlewares/clients/saveClientMW");
const deleteClientMW = require("../middlewares/clients/deleteClientMW");
const buttonRedirectMW = require("../middlewares/buttonRedirectMW");

module.exports = (objectRepository) => {
    const router = express.Router();

    router.get("/", getClientsMW(objectRepository), renderMW(objectRepository, "clients"));
    router.get("/new", renderMW(objectRepository, "edit-client"));
    router.post("/new", buttonRedirectMW(objectRepository, "cancel", "/clients"), saveClientMW(objectRepository), redirectMW(objectRepository, "/clients"));
    router.get("/edit/:clientId", getClientMW(objectRepository), renderMW(objectRepository, "edit-client"));
    router.post("/edit/:clientId", buttonRedirectMW(objectRepository, "cancel", "/clients"), getClientMW(objectRepository), saveClientMW(objectRepository), redirectMW(objectRepository, "/clients"));
    router.post("/delete/:clientId", getClientsMW(objectRepository), deleteClientMW(objectRepository), redirectMW(objectRepository, "/clients"));

    return router;
};