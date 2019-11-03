const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const logRequestMW = require("./middlewares/logRequestMW");
const setUpRoutes = require("./routes/index");

const app = express();

app.use(logRequestMW);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("static"));

app.use(
    session({
        secret: "e1Lom1DiqyqvoLKJJcbl",
        resave: false,
        saveUninitialized: false
    })
);

setUpRoutes(app);

app.use((err, req, res, next) => {
    console.error(err);
    res.end("Something went wrong...");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});