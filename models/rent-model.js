const CarModel = require("./car-model");
const ClientModel = require("./client-model");

function getRent(id) {
    const options = {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false};
    return {
        rent: {
            _id: id,
            carId: id,
            clientId: id,
            startDate: new Date("2019-09-23 16:00").toLocaleDateString("hu-HU", options),
            endDate: new Date("2019-09-25 18:00").toLocaleDateString("hu-HU", options)
        },
        car: CarModel.getCar(id),
        client: ClientModel.getClient(id)
    }
}

function getRents() {
    return [
        getRent(1),
        getRent(2),
        getRent(3),
        getRent(4),
    ]
}

function saveRent(rent) {

}

function deleteRent(rent) {

}

module.exports = {
    getRent,
    getRents,
    saveRent,
    deleteRent
};