/*
* Renders the specified view
* Currently it only redirects to a given html file
*/
module.exports = (view) => (req, res, next) => {
    return res.redirect(view);
};

