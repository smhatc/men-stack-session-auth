// SETUP
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
const morgan = require("morgan");
const authController = require("./controllers/auth");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
        console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
}));

// ROUTES
app.get("/", (req, res) => {
        res.render("index.ejs", {
                title: "My App",
                user: req.session.user,
        });
});

app.use("/auth", authController);

// STARTING THE SERVER
app.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
});