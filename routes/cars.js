const express = require("express");

const renderMW = require("../middlewares/renderMW");
const getCarMW = require("../middlewares/cars/getCarMW");
const getCarsMW = require("../middlewares/cars/getCarsMW");
const saveCarMW = require("../middlewares/cars/saveCarMW");
const deleteCarMW = require("../middlewares/cars/deleteCarMW");

const router = express.Router();

router.get("/", getCarsMW, renderMW("/cars.html"));
router.get("/new", renderMW("/edit-car.html"));
router.post("/new", saveCarMW, renderMW("/cars.html"));
router.get("/edit/:carId", getCarMW, renderMW("/edit-car.html"));
router.post("/edit/:carId", getCarMW, saveCarMW, renderMW("/cars.html"));
router.delete("/delete/:carId", getCarMW, deleteCarMW, renderMW("/cars.html"));

module.exports = router;