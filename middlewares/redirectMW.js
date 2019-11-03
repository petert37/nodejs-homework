/*
* Redirects to the specified path
*/
module.exports = (objectRepository, redirectPath) => (req, res, next) => {
    const path = typeof redirectPath === "function" ? redirectPath(req, res) : redirectPath;
    return res.redirect(path);
};