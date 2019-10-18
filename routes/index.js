const cars = require("./cars");
const rents = require("./rents");
const clients = require("./clients");

const renderMW = require("../middlewares/renderMW");
const authMW = require("../middlewares/auth/authMW");
const reverseAuthMW = require("../middlewares/auth/reverseAuthMW");
const loginMW = require("../middlewares/auth/loginMW");
const logoutMW = require("../middlewares/auth/logoutMW");
const registerMW = require("../middlewares/auth/registerMW");
const passwordResetEmailMW = require("../middlewares/auth/passwordResetEmailMW");
const checkPasswordResetTokenMW = require("../middlewares/auth/checkPasswordResetTokenMW");
const resetPasswordMW = require("../middlewares/auth/resetPasswordMW");

module.exports = function (app) {

    app.get("/", reverseAuthMW, renderMW("/login.html"));
    app.get("/login", reverseAuthMW, renderMW("/login.html"));
    app.post("/login", loginMW, renderMW("/cars.html"));
    app.post("/logout", authMW, logoutMW, renderMW("/login.html"));
    app.get("/register", reverseAuthMW, renderMW("/register.html"));
    app.post("/register", registerMW, renderMW("/cars.html"));
    app.post("/forgot-password-email", passwordResetEmailMW, renderMW("/forgot-password-email.html"));
    app.get("/reset-password", checkPasswordResetTokenMW, renderMW("/reset-password.html"));
    app.post("/reset-password", resetPasswordMW, renderMW("/login.html"));

    app.use("/cars", authMW, cars);
    app.use("/rents", authMW, rents);
    app.use("/clients", authMW, clients);

};