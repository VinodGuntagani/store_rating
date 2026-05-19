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
  getDashboard,
  getUsers,
  getUserDetails,
  getUserRatings,
  getOwnerStores,
  getOwners,  
} = require(
  "../controllers/adminController"
);

router.get(
  "/dashboard",
  verifyToken,
  checkRole("ADMIN"),
  getDashboard
);

router.get(
  "/users",
  verifyToken,
  checkRole("ADMIN"),
  getUsers
);
router.get(
  "/users/:id",
  verifyToken,
  checkRole("ADMIN"),
  getUserDetails
);
router.get(
  "/users/:id/ratings",
  verifyToken,
  checkRole("ADMIN"),
  getUserRatings
);
router.get(
  "/users/:id/stores",
  verifyToken,
  checkRole("ADMIN"),
  getOwnerStores
);
router.get(
  "/owners",
  verifyToken,
  checkRole("ADMIN"),
  getOwners
);
module.exports = router;