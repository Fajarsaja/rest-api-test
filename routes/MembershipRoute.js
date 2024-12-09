const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  updateProfileImage,
} = require("../controllers/MembershipController");

router.post("/api/v1/registration", register);
router.post("/api/v1/login", login);
router.get("/api/v1/profile", getProfile);
router.put("/api/v1/profile/update", updateProfile);
router.put("/api/v1/profile/image", updateProfileImage);

module.exports = router;
