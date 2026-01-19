const { Router } = require("express");
const { getMe } = require("../controllers/user.controller");

const router = Router();

router.get("/me", getMe);

module.exports = router;
