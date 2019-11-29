/*
* Renders the specified view
*/
module.exports = (objectRepository, view) => (req, res, next) => {
    if (view != null && view.endsWith(".html")) {
        return res.redirect(view);
    } else {
        console.log("Rendering", view);
        console.log(JSON.stringify(res.locals, null, 2));
        return res.render(view);
    }
};

