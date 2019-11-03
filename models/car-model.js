function getCar(id) {
    return {
        _id: id,
        model: "Opel Astra",
        year: 2006,
        plateNumber: "ABC-123"
    }
}

function getCars() {
    return [
        getCar(1),
        getCar(2),
        getCar(3),
        getCar(4),
    ]
}

function saveCar(car) {

}

function deleteCar(car) {

}

module.exports = {
    getCar,
    getCars,
    saveCar,
    deleteCar
};