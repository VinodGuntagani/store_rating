const express = require(
  "express"
);

const router =
  express.Router();

const verifyToken = require(
  "../middleware/authMiddleware"
);

const checkRole = require(
  "../middleware/roleMiddleware"
);

const {
  getOwnerDashboard,
  getStoreRatings,
} = require(
  "../controllers/ownerController"
);

router.get(
  "/dashboard",
  verifyToken,
  checkRole("OWNER"),
  getOwnerDashboard
);

router.get(
  "/ratings",
  verifyToken,
  checkRole("OWNER"),
  getStoreRatings
);

module.exports = router;