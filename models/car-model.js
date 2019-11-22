const db = require("../config/db");

const CarDBModel = db.model("Car", {
    model: String,
    year: Number,
    plateNumber: String
});

function newCar() {
    return new CarDBModel();
}

function getCar(id) {
    return CarDBModel.findById(id);
}

function getCars() {
    return CarDBModel.find();
}

function saveCar(car) {
    return car.save();
}

function deleteCar(car) {
    return car.remove();
}

module.exports = {
    newCar,
    getCar,
    getCars,
    saveCar,
    deleteCar
};