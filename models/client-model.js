const Schema = require("mongoose").Schema;
const db = require("../config/db");

const ClientDBModel = db.model("Client", {
    name: String,
    phone: String
});

function newClient() {
    return new ClientDBModel();
}

function getClient(id) {
    return ClientDBModel.findById(id);
}

function getClients() {
    return ClientDBModel.find();
}

function saveClient(client) {
    return client.save();
}

function deleteClient(client) {
    return client.remove();
}

module.exports = {
    newClient,
    getClient,
    getClients,
    saveClient,
    deleteClient
};