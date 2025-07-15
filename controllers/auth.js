// SETUP
const express = require("express");
const router = express.Router();
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
                        const newUser = await User.create(formData);
                        res.send(`Thank you for signing up, ${newUser.username}!`);
                }
        } else {
                return res.send("An account with this username already exists.");
        }
});

// EXPORTING ROUTES
module.exports = router;