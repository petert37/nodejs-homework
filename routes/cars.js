const express = require("express");

const renderMW = require("../middlewares/renderMW");
const redirectMW = require("../middlewares/redirectMW");
const getCarMW = require("../middlewares/cars/getCarMW");
const getCarsMW = require("../middlewares/cars/getCarsMW");
const saveCarMW = require("../middlewares/cars/saveCarMW");
const deleteCarMW = require("../middlewares/cars/deleteCarMW");
const buttonRedirectMW = require("../middlewares/buttonRedirectMW");

module.exports = (objectRepository) => {
    const router = express.Router();

    router.get("/", getCarsMW(objectRepository), renderMW(objectRepository, "cars"));
    router.get("/new", renderMW(objectRepository, "edit-car"));
    router.post("/new", buttonRedirectMW(objectRepository, "cancel", "/cars"), saveCarMW(objectRepository), redirectMW(objectRepository, "/cars"));
    router.get("/edit/:carId", getCarMW(objectRepository), renderMW(objectRepository, "edit-car"));
    router.post("/edit/:carId", buttonRedirectMW(objectRepository, "cancel", "/cars"), getCarMW(objectRepository), saveCarMW(objectRepository), redirectMW(objectRepository, "/cars"));
    router.post("/delete/:carId", getCarMW(objectRepository), deleteCarMW(objectRepository), redirectMW(objectRepository, "/cars"));

    return router;
};