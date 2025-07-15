// SETUP
const express = require("express");
const router = express.Router();

// ROUTES
router.get("/", (req, res) => {
        res.send("Welcome to the auth page!");
});

// EXPORTING ROUTES
module.exports = router;