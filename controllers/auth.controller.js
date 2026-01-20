const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true on deployed HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};


const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already exists" });

  const user = await User.create({ name, email, password });

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  // ✅ SET JWT COOKIE (not userId)
  res.cookie("token", token, COOKIE_OPTIONS);

  res.json({
    user: { _id: user._id, name: user.name, email: user.email },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await user.comparePassword(password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  // ✅ SET JWT COOKIE
  res.cookie("token", token, COOKIE_OPTIONS);

  res.json({
    user: { _id: user._id, name: user.name, email: user.email },
  });
};

const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
  });

  res.json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
