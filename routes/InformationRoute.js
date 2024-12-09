const express = require("express");
const router = express.Router();
const { getBanners, getServices } = require("../controllers/InformationController");

router.get("/api/v1/banner", getBanners);
router.get("/api/v1/services", getServices);

module.exports = router;
