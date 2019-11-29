const db = require("../config/db");
const bcrpt = require("bcrypt");
const crypto = require("crypto");

const saltRounds = 8;

const UserDBModel = db.model("User", {
    username: String,
    passwordHash: String,
    passwordResetToken: String
});

function newUser() {
    return new UserDBModel();
}

function findUser(username) {
    return UserDBModel.findOne({username}).exec();
}

function findUserByPasswordResetToken(passwordResetToken) {
    return UserDBModel.findOne({passwordResetToken}).exec();
}

async function register(username, password) {
    let user = await findUser(username);
    if (user != null) {
        return Promise.reject("User already exists");
    }
    if (username == null || username.length === 0) {
        return Promise.reject("Invalid username");
    }
    if (password == null || password.length === 0) {
        return Promise.reject("Invalid password");
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

function generateToken(length = 20) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
            if (err) {
                reject(err);
            } else {
                const token = buf.toString("hex").slice(0, length);
                resolve(token);
            }
        });
    })
}

async function createPasswordResetToken(username) {
    const user = await findUser(username);
    if (user == null) {
        return Promise.reject("User not found");
    }
    const token = await generateToken(48);
    user.passwordResetToken = token;
    await saveUser(user);
    return token;
}

async function resetPassword(token, password) {
    const user = await findUserByPasswordResetToken(token);
    if (user == null) {
        return Promise.reject("User not found");
    }
    if (user.passwordResetToken !== token) {
        return Promise.reject("Invalid password reset token");
    }
    user.passwordHash = await bcrpt.hash(password, saltRounds);
    user.passwordResetToken = undefined;
    await saveUser(user);
    return user;
}

module.exports = {
    newUser,
    findUser,
    saveUser,
    register,
    login,
    createPasswordResetToken,
    resetPassword,
    findUserByPasswordResetToken
};