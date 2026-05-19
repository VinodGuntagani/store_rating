const express = require("express");

const router = express.Router();

const {
  submitRating,
  getAverageRatings,
  getUserRatings,
} = require("../controllers/ratingController");

const verifyToken = require(
  "../middleware/authMiddleware"
);

router.post(
  "/submit",
  verifyToken,
  submitRating
);

router.get(
  "/average",
  verifyToken,
  getAverageRatings
);

router.get(
  "/my-ratings",
  verifyToken,
  getUserRatings
);

module.exports = router;