const {expect} = require("chai");
const {stub, spy} = require("sinon");
const loginMW = require("../../../middlewares/auth/loginMW");

describe("Login middleware", () => {

    it("res.locals has error, when user is not found", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        await loginMW({
            UserModel: {
                login: () => Promise.reject("User not found")
            }
        })({body: {}, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(locals.error).to.equal("User not found");
    });

    it("res.locals has error, when password is invalid", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        await loginMW({
            UserModel: {
                login: () => Promise.reject("Invalid password")
            }
        })({body: {}, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(locals.error).to.equal("Invalid password");
    });

    it("next is called with unknown error", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        const error = new Error("Unknown error");
        await loginMW({
            UserModel: {
                login: () => Promise.reject(error)
            }
        })({body: {}, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(1);
        expect(next.firstCall.args[0]).to.equal(error);
        expect(locals.error).to.be.undefined;
    });

    it("successful login sets loggedIn and username", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        const username = "loggedInUser";
        await loginMW({
            UserModel: {
                login: () => Promise.resolve({username})
            }
        })({body: {}, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(session.loggedIn).to.equal(true);
        expect(session.username).to.equal(username);
        expect(locals.username).to.equal(username);
        expect(locals.error).to.be.undefined;
    });

    it("loggedIn is false and username is undefined when login fails (this should not happen)", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        await loginMW({
            UserModel: {
                login: () => Promise.resolve(null)
            }
        })({body: {}, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(session.loggedIn).to.equal(false);
        expect(session.username).to.be.undefined;
        expect(locals.username).to.be.undefined;
        expect(locals.error).to.be.undefined;
    });

    it("UserModel.login is called with username and password passed in body", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        const username = "usernameToUse";
        const password = "passwordToUse";
        const login = stub().returns({username});
        await loginMW({
            UserModel: {
                login: login
            }
        })({body: {username, password}, session}, {locals}, next);
        expect(login.called).to.equal(true);
        expect(login.callCount).to.equal(1);
        expect(login.firstCall.args.length).to.equal(2);
        expect(login.firstCall.args[0]).to.equal(username);
        expect(login.firstCall.args[1]).to.equal(password);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(session.loggedIn).to.equal(true);
        expect(session.username).to.equal(username);
        expect(locals.username).to.equal(username);
        expect(locals.error).to.be.undefined;
    });

});