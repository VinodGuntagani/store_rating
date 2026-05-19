const express = require("express");

const router = express.Router();

const {
  register,
  login,
  updatePassword,
} = require("../controllers/authController");

const verifyToken = require(
  "../middleware/authMiddleware"
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.put(
  "/update-password",
  verifyToken,
  updatePassword
);

module.exports = router;