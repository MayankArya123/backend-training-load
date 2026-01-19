// controllers/userController.js
const getMe = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    console.log('get user route hitting',req.user)
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {getMe}
