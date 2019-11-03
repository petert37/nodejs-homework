const cars = require("./cars");
const rents = require("./rents");
const clients = require("./clients");

const renderMW = require("../middlewares/renderMW");
const redirectMW = require("../middlewares/redirectMW");
const authMW = require("../middlewares/auth/authMW");
const reverseAuthMW = require("../middlewares/auth/reverseAuthMW");
const loginMW = require("../middlewares/auth/loginMW");
const logoutMW = require("../middlewares/auth/logoutMW");
const registerMW = require("../middlewares/auth/registerMW");
const passwordResetEmailMW = require("../middlewares/auth/passwordResetEmailMW");
const generatePasswordResetEmailMW = require("../middlewares/auth/generatePasswordResetEmailMW");
const checkPasswordResetTokenMW = require("../middlewares/auth/checkPasswordResetTokenMW");
const resetPasswordMW = require("../middlewares/auth/resetPasswordMW");

const CarModel = require("../models/car-model");
const ClientModel = require("../models/client-model");
const RentModel = require("../models/rent-model");
const UserModel = require("../models/user-model");

module.exports = function (app) {

    const objectRepository = {
        CarModel,
        ClientModel,
        RentModel,
        UserModel
    };

    app.get("/", reverseAuthMW(objectRepository), redirectMW(objectRepository, "/login"));
    app.get("/login", reverseAuthMW(objectRepository), renderMW(objectRepository, "login"));
    app.post("/login", passwordResetEmailMW(objectRepository), loginMW(objectRepository), redirectMW(objectRepository, "/cars"));
    app.post("/logout", authMW(objectRepository), logoutMW(objectRepository), redirectMW(objectRepository, "/login"));
    app.get("/register", reverseAuthMW(objectRepository), renderMW(objectRepository, "register"));
    app.post("/register", registerMW(objectRepository), redirectMW(objectRepository, "/cars"));
    app.get("/forgot-password-email", generatePasswordResetEmailMW(objectRepository), renderMW(objectRepository, "forgot-password-email"));
    app.get("/reset-password", checkPasswordResetTokenMW(objectRepository), renderMW(objectRepository, "reset-password"));
    app.post("/reset-password", resetPasswordMW(objectRepository), redirectMW(objectRepository, "/login"));

    app.use("/cars", authMW(objectRepository), cars(objectRepository));
    app.use("/rents", authMW(objectRepository), rents(objectRepository));
    app.use("/clients", authMW(objectRepository), clients(objectRepository));

};