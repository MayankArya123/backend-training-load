const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Register
const register = async (req, res) => {
  try {
    console.log("register route hitting");

    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // ⭐ SET COOKIE
    res.cookie("token", token, COOKIE_OPTIONS);

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // ⭐ SET COOKIE
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
};
