const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/car_rental_ys93ek", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to mongodb");
}).catch(err => {
    console.error(err);
});

module.exports = mongoose;