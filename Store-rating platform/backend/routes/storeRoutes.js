const express = require("express");

const router = express.Router();

const {
  addStore,
  getStores,
} = require(
  "../controllers/storeController"
);

const verifyToken = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

router.post(
  "/add",
  verifyToken,
  roleMiddleware("ADMIN"),
  addStore
);

router.get(
  "/all",
  verifyToken,
  getStores
);

module.exports = router;