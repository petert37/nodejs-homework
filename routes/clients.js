const express = require("express");

const renderMW = require("../middlewares/renderMW");
const getClientMW = require("../middlewares/clients/getClientMW");
const getClientsMW = require("../middlewares/clients/getClientsMW");
const saveClientMW = require("../middlewares/clients/saveClientMW");
const deleteClientMW = require("../middlewares/clients/deleteClientMW");

const router = express.Router();

router.get("/", getClientsMW, renderMW("/clients.html"));
router.get("/new", renderMW("/edit-client.html"));
router.post("/new", saveClientMW, renderMW("/clients.html"));
router.get("/edit/:clientId", getClientMW, renderMW("/edit-client.html"));
router.post("/edit/:clientId", getClientMW, saveClientMW, renderMW("/clients.html"));
router.delete("/delete/:clientId", getClientsMW, deleteClientMW, renderMW("/clients.html"));

module.exports = router;