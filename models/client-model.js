function getClient(id) {
    return {
        _id: id,
        name: "Tóth Péter",
        phone: "+36 30 123 4567"
    }
}

function getClients() {
    return [
        getClient(1),
        getClient(2),
        getClient(3),
        getClient(4),
    ]
}

function saveClient(client) {

}

function deleteClient(client) {

}

module.exports = {
    getClient,
    getClients,
    saveClient,
    deleteClient
};