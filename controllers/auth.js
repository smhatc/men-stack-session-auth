// SETUP
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

// ROUTES
router.get("/sign-up", (req, res) => {
        res.render("./auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
        const formData = req.body;
        const userInDatabase = await User.findOne({ username: formData.username, });
        if (!userInDatabase) {
                if (formData.password !== formData.confirmPassword) {
                        return res.send("The password and confirm password do not match, please try again.");
                } else {
                        const hashedPassword = bcrypt.hashSync(formData.password, 10);
                        formData.password = hashedPassword;
                        const newUser = await User.create(formData);
                        res.send(`Thank you for signing up, ${newUser.username}!`);
                }
        } else {
                return res.send("An account with this username already exists.");
        }
});

router.get("/sign-in", (req, res) => {
        res.render("./auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
        const formData = req.body;
        const userInDatabase = await User.findOne({ username: formData.username, });
        const failureMessage = "Sign in failed, please try again.";
        if (!userInDatabase) {
                return res.send(failureMessage);
        } else {
                const validPassword = bcrypt.compareSync(formData.password, userInDatabase.password);
                if (!validPassword) {
                        return res.send(failureMessage);
                } else {
                        req.session.user = {
                                username: userInDatabase.username,
                                _id: userInDatabase._id,
                        };
                        res.redirect("/");
                }
        }
});

router.get("/sign-out", (req, res) => {
        req.session.destroy();
        res.redirect("/");
});

// EXPORTING ROUTES
module.exports = router;