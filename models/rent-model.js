const Schema = require("mongoose").Schema;
const db = require("../config/db");
const CarModel = require("./car-model");
const ClientModel = require("./client-model");

const RentDBModel = db.model("Rent", {
    carId: {
        type: Schema.Types.ObjectId,
        ref: "Car"
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    startDate: Date,
    endDate: Date
});

const dateFormat = {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false};

function newRent() {
    return new RentDBModel();
}

async function getRent(id) {
    const rent = await RentDBModel.findById(id);
    return loadRentData(rent);
}

async function getRents() {
    const rents = await RentDBModel.find();
    return Promise.all(rents.map(rent => loadRentData(rent)));
}

function saveRent(rent) {
    return rent.save();
}

function deleteRent(rent) {
    return rent.remove();
}

async function loadRentData(rent) {
    if (rent == null) {
        return undefined;
    }
    let car;
    let client;
    if (rent.carId != null) {
        car = await CarModel.getCar(rent.carId);
    }
    if (rent.clientId != null) {
        client = await ClientModel.getClient(rent.clientId);
    }

    let formattedStartDate = "";
    let formattedEndDate = "";
    if (rent.startDate instanceof Date) {
        formattedStartDate = rent.startDate.toLocaleDateString("hu-HU", dateFormat);
    }
    if (rent.endDate instanceof Date) {
        formattedEndDate = rent.endDate.toLocaleDateString("hu-HU", dateFormat);
    }

    return {rent, car, client, formattedStartDate, formattedEndDate};
}

async function isCarFree(rentId, carId, startDate, endDate) {
    const conditions = {
        carId: carId,
        $or: [
            {startDate: {$gte: startDate, $lte: endDate}},
            {endDate: {$gte: startDate, $lte: endDate}},
        ]
    };
    if (typeof rentId !== "undefined") {
        conditions._id = {$ne: rentId};
    }
    const rent = await RentDBModel.findOne(conditions).exec();
    if (rent == null) {
        return {free: true, message: null};
    } else {
        const formattedStartDate = rent.startDate.toLocaleDateString("hu-HU", dateFormat);
        const formattedEndDate = rent.endDate.toLocaleDateString("hu-HU", dateFormat);
        return {free: false, message: `Car is already rented from ${formattedStartDate} to ${formattedEndDate}`};
    }
}

module.exports = {
    newRent,
    getRent,
    getRents,
    saveRent,
    deleteRent,
    isCarFree
};