const {expect} = require("chai");
const {stub, spy} = require("sinon");
const saveRentMW = require("../../../middlewares/rents/saveRentMW");

describe("saveRent middleware", () => {

    it("res.locals has error, when the body is missing the carId field", async () => {
        await expectLocalsError({}, "Invalid input data");
    });

    it("res.locals has error, when the body is missing the clientId field", async () => {
        await expectLocalsError({carId: "7"}, "Invalid input data");
    });

    it("res.locals has error, when the body is missing the startDate filed", async () => {
        await expectLocalsError({carId: "7", clientId: "3"}, "Invalid input data");
    });

    it("res.locals has error, when the body is missing the endDate field", async () => {
        await expectLocalsError({carId: "7", clientId: "3", startDate: "2019-12-13 23:59:59"}, "Invalid input data");
    });

    it("res.locals has error, when clientId is an empty string", async () => {
        await expectLocalsError({
                carId: "7",
                clientId: "",
                startDate: "2019-12-13 23:59:59",
                endDate: "2019-12-13 23:59:59"
            },
            "Invalid client");
    });

    it("res.locals has error, when startDate is not a valid date", async () => {
        await expectLocalsError({
                carId: "7",
                clientId: "3",
                startDate: "2019-12-13 23:59:59 23:59:59",
                endDate: "2019-12-13 23:59:59"
            },
            "Invalid start date");
    });

    it("res.locals has error, when endDate is not a valid date", async () => {
        await expectLocalsError({
                carId: "7",
                clientId: "3",
                startDate: "2019-12-13 23:59:59",
                endDate: "2019-12-13 alma"
            },
            "Invalid end date");
    });

    it("res.locals has error, when endDate is before startDate", async () => {
        await expectLocalsError({
                carId: "7",
                clientId: "3",
                startDate: "2019-12-13 23:59:59",
                endDate: "2019-12-13 21:59:59"
            },
            "End cannot be before start");
    });

    it("res.locals has error, when the car is not free in the selected date range", async () => {
        const message = "Car is already rented from 2019-12-11 12:00:00 to 2019-12-13 22:00:00";
        const isCarFree = stub().returns({free: false, message: message});
        await expectLocalsError({
                carId: "7",
                clientId: "3",
                startDate: "2019-12-13 21:59:59",
                endDate: "2019-12-13 23:59:59"
            },
            message, {isCarFree});
    });

    it("new rent is created when one is not provided", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        const saveRent = spy();
        const isCarFree = stub().returns({free: true});
        const newRent = stub().returns({});
        const body = {
            carId: "7",
            clientId: "3",
            startDate: "2019-12-13 21:59:59",
            endDate: "2019-12-13 23:59:59"
        };
        await saveRentMW({
            RentModel: {isCarFree, saveRent, newRent}
        })({body, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(locals.error).to.be.undefined;
        expect(newRent.called).to.equal(true);
        expect(newRent.callCount).to.equal(1);
        expect(locals.rent).not.to.be.undefined;
        expect(locals.rent.carId).to.equal(body.carId);
        expect(locals.rent.clientId).to.equal(body.clientId);
        expect(locals.rent.startDate).to.equal(new Date(body.startDate).getTime());
        expect(locals.rent.endDate).to.equal(new Date(body.endDate).getTime());
    });

    it("provided rent is updated", async () => {
        const session = {};
        const locals = {
            rent: {
                carId: "1",
                clientId: "2",
                startDate: "2019-12-15 21:59:59",
                endDate: "2019-12-16 23:59:59"
            }
        };
        const next = spy();
        const saveRent = spy();
        const isCarFree = stub().returns({free: true});
        const newRent = stub().returns({});
        const body = {
            carId: "7",
            clientId: "3",
            startDate: "2019-12-13 21:59:59",
            endDate: "2019-12-13 23:59:59"
        };
        await saveRentMW({
            RentModel: {isCarFree, saveRent, newRent}
        })({body, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(locals.error).to.be.undefined;
        expect(newRent.called).to.equal(false);
        expect(locals.rent.carId).to.equal(body.carId);
        expect(locals.rent.clientId).to.equal(body.clientId);
        expect(locals.rent.startDate).to.equal(new Date(body.startDate).getTime());
        expect(locals.rent.endDate).to.equal(new Date(body.endDate).getTime());
    });

    it("next is called with error if saving fails", async () => {
        const session = {};
        const locals = {};
        const error = new Error("Error while saving rent");
        const next = spy();
        const saveRent = stub().throws(error);
        const isCarFree = stub().returns({free: true});
        const newRent = stub().returns({});
        const body = {
            carId: "7",
            clientId: "3",
            startDate: "2019-12-13 21:59:59",
            endDate: "2019-12-13 23:59:59"
        };
        await saveRentMW({
            RentModel: {isCarFree, saveRent, newRent}
        })({body, session}, {locals}, next);
        expect(saveRent.called).to.equal(true);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(1);
        expect(next.firstCall.args[0]).to.equal(error);
        expect(locals.error).to.be.undefined;
    });

    it("RentModel.isCarFree is called with the provided rent id", async () => {
        const session = {};
        const locals = {
            rent: {
                _id: "currentRentId",
                carId: "1",
                clientId: "2",
                startDate: "2019-12-15 21:59:59",
                endDate: "2019-12-16 23:59:59"
            }
        };
        const next = spy();
        const saveRent = spy();
        const isCarFree = stub().returns({free: true});
        const body = {
            carId: "7",
            clientId: "3",
            startDate: "2019-12-13 21:59:59",
            endDate: "2019-12-13 23:59:59"
        };
        await saveRentMW({
            RentModel: {isCarFree, saveRent}
        })({body, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(locals.error).to.be.undefined;
        expect(isCarFree.called).to.equal(true);
        expect(isCarFree.firstCall.args[0]).to.equal(locals.rent._id);
    });

    it("RentModel.isCarFree is called with undefined rent id when a rent is not provided", async () => {
        const session = {};
        const locals = {};
        const next = spy();
        const saveRent = spy();
        const isCarFree = stub().returns({free: true});
        const newRent = stub().returns({});
        const body = {
            carId: "7",
            clientId: "3",
            startDate: "2019-12-13 21:59:59",
            endDate: "2019-12-13 23:59:59"
        };
        await saveRentMW({
            RentModel: {isCarFree, saveRent, newRent}
        })({body, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(locals.error).to.be.undefined;
        expect(isCarFree.called).to.equal(true);
        expect(isCarFree.firstCall.args[0]).to.be.undefined;
    });

    async function expectLocalsError(body, error, rentModel = {}) {
        const session = {};
        const locals = {};
        const next = spy();
        await saveRentMW({
            RentModel: rentModel
        })({body, session}, {locals}, next);
        expect(next.called).to.equal(true);
        expect(next.callCount).to.equal(1);
        expect(next.firstCall.args.length).to.equal(0);
        expect(locals.error).to.equal(error);
    }

});