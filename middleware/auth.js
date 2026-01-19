const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const authMiddleware = async (req, res, next) => {
  let token;

  // ✅ 1. Read token from HTTP-only cookie (PRIMARY)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  console.log("token check", token);

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
