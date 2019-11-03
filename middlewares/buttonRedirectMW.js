/**
 * Checks, if the button with name 'inputName' was pressed, if so, redirects to the given route
 */
module.exports = (objectRepository, inputName, redirectRoute) => (req, res, next) => {

    if (typeof req.body[inputName] !== "undefined") {
        const route = typeof redirectRoute === "function" ? redirectRoute(req, res) : redirectRoute;
        return res.redirect(route);
    }

    next();
};

