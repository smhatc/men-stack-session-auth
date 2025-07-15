// SETUP
const express = require("express");
const router = express.Router();

// ROUTES
router.get("/sign-up", (req, res) => {
        res.render("./auth/sign-up.ejs");
});

// EXPORTING ROUTES
module.exports = router;