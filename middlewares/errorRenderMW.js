/*
* Renders the specified view if res.locals.error has a value
*/
module.exports = (objectRepository, view) => (req, res, next) => {
    if (res.locals.error) {
        const v = typeof view === "function" ? view(req, res) : view;
        console.log("Rendering", v);
        console.log(JSON.stringify(res.locals, null, 2));
        return res.render(v);
    }
    next();
};

