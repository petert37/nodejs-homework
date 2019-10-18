const express = require("express");

const renderMW = require("../middlewares/renderMW");
const getRentMW = require("../middlewares/rents/getRentMW");
const getRentsMW = require("../middlewares/rents/getRentsMW");
const saveRentMW = require("../middlewares/rents/saveRentMW");
const deleteRentMW = require("../middlewares/rents/deleteRentMW");
const storeRentDetailsMW = require("../middlewares/rents/storeRentDetailsMW");
const loadRentDetailsMW = require("../middlewares/rents/loadRentDetailsMW");
const getClientsMW = require("../middlewares/clients/getClientsMW");
const getClientMW = require("../middlewares/clients/getClientMW");
const getCarMW = require("../middlewares/cars/getCarMW");

const router = express.Router();

router.get("/", getRentsMW, renderMW("/rents.html"));
router.get("/edit/:rentId", getRentMW, renderMW("/edit-rent.html"));
router.post("/edit/:rentId", getRentMW, saveRentMW, renderMW("/rents.html"));
router.post("/edit/:rentId/clients", storeRentDetailsMW, getClientsMW, renderMW("/pick-client.html"));
router.post("/edit/:rentId/clients/:clientId", getClientMW, loadRentDetailsMW, renderMW("/edit-rent.html"));
router.delete("/delete/:rentId", getRentMW, deleteRentMW, renderMW("/rents.html"));
router.get("/new/:carId", getCarMW, renderMW("/edit-rent.html"));
router.post("/new/:carId", saveRentMW, renderMW("/rents.html"));
router.post("/new/:carId/clients", storeRentDetailsMW, getClientsMW, renderMW("/pick-client.html"));
router.post("/new/:carId/clients/:clientId", getClientMW, loadRentDetailsMW, renderMW("/edit-rent.html"));

module.exports = router;