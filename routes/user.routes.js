const { Router } = require("express");
const { getMe } = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const router = Router();

router.get("/me", auth, getMe);

module.exports = router;
