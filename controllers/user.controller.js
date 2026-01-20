const User = require("../models/user");

const getMe = async (req, res) => {
  try {
    // ✅ Get userId from session

    console.log("get user route hitting");
    const userId = req.userId;

    console.log("check userId", userId);

    if (!userId) {
      return res.status(401).json({ error: "Not logged in" });
    }

    // Fetch user from database
    const user = await User.findById(userId);
    console.log("user found it", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getMe };
