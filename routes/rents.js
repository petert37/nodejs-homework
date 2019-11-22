const express = require("express");

const renderMW = require("../middlewares/renderMW");
const redirectMW = require("../middlewares/redirectMW");
const getRentMW = require("../middlewares/rents/getRentMW");
const getRentsMW = require("../middlewares/rents/getRentsMW");
const saveRentMW = require("../middlewares/rents/saveRentMW");
const deleteRentMW = require("../middlewares/rents/deleteRentMW");
const storeRentDetailsMW = require("../middlewares/rents/storeRentDetailsMW");
const loadRentDetailsMW = require("../middlewares/rents/loadRentDetailsMW");
const loadSessionClientMW = require("../middlewares/rents/loadSessionClientMW");
const pickClientMW = require("../middlewares/rents/pickClientMW");
const getClientsMW = require("../middlewares/clients/getClientsMW");
const getCarMW = require("../middlewares/cars/getCarMW");
const buttonRedirectMW = require("../middlewares/buttonRedirectMW");

module.exports = (objectRepository) => {
    const router = express.Router();

    router.get("/",
        getRentsMW(objectRepository),
        renderMW(objectRepository, "rents")
    );
    router.get("/edit/:rentId",
        getRentMW(objectRepository),
        loadRentDetailsMW(objectRepository),
        loadSessionClientMW(objectRepository),
        renderMW(objectRepository, "edit-rent")
    );
    router.post("/edit/:rentId",
        buttonRedirectMW(objectRepository, "cancel", "/rents"),
        storeRentDetailsMW(objectRepository, req => `/rents/edit/${req.params.rentId}/clients`),
        getRentMW(objectRepository),
        saveRentMW(objectRepository),
        redirectMW(objectRepository, "/rents")
    );
    router.get("/edit/:rentId/clients",
        getClientsMW(objectRepository),
        renderMW(objectRepository, "pick-client")
    );
    router.post("/edit/:rentId/clients",
        pickClientMW(objectRepository),
        redirectMW(objectRepository, req => `/rents/edit/${req.params.rentId}`)
    );
    router.post("/delete/:rentId",
        getRentMW(objectRepository),
        deleteRentMW(objectRepository),
        redirectMW(objectRepository, "/rents")
    );
    router.get("/new/:carId",
        getCarMW(objectRepository),
        loadRentDetailsMW(objectRepository),
        loadSessionClientMW(objectRepository),
        renderMW(objectRepository, "edit-rent")
    );
    router.post("/new/:carId",
        buttonRedirectMW(objectRepository, "cancel", "/rents"),
        storeRentDetailsMW(objectRepository, req => `/rents/new/${req.params.carId}/clients`),
        saveRentMW(objectRepository),
        redirectMW(objectRepository, "/rents")
    );
    router.get("/new/:carId/clients",
        getClientsMW(objectRepository),
        renderMW(objectRepository, "pick-client")
    );
    router.post("/new/:carId/clients",
        pickClientMW(objectRepository),
        redirectMW(objectRepository, req => `/rents/new/${req.params.carId}`)
    );

    return router;
};