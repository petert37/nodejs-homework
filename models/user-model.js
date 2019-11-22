const db = require("../config/db");
const bcrpt = require("bcrypt");

const saltRounds = 8;

const UserDBModel = db.model("User", {
    username: String,
    passwordHash: String
});

function newUser() {
    return new UserDBModel();
}

function findUser(username) {
    return UserDBModel.findOne({username}).exec();
}

async function register(username, password) {
    let user = await findUser(username);
    if (user != null) {
        return Promise.reject("User already exists");
    }
    const passwordHash = await bcrpt.hash(password, saltRounds);
    user = newUser();
    user.username = username;
    user.passwordHash = passwordHash;
    await saveUser(user);
    return user;
}

async function login(username, password) {
    const user = await findUser(username);
    if (user == null) {
        return Promise.reject("User not found");
    }
    const match = await bcrpt.compare(password, user.passwordHash);
    if (match === false) {
        return Promise.reject("Invalid password");
    }
    return user;
}

function saveUser(user) {
    return user.save();
}

module.exports = {
    newUser,
    findUser,
    saveUser,
    register,
    login
};