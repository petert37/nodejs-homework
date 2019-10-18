const express = require("express");
const setUpRoutes = require("./routes/index");

const app = express();

app.use(express.static("static"));

setUpRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});