const express = require("express");
const router = express.Router();

const { submitSolution } = require("../controllers/submission.controller");
const wrapAsync = require("../utils/wrapAsync");

router.post("/submission", wrapAsync(submitSolution));

module.exports = router;