const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

router.get(
  "/protected",
  verifyToken,
  (req, res) => {
    res.json({
      message: "Protected route accessed",
      user: req.user,
    });
  }
);

module.exports = router;