const express = require("express");
const {getDetails, updateDetails, verifyUser} = require("../controllers/user");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getlist", verifyToken, getDetails);
router.post("/register", verifyToken, updateDetails);
router.get("/unregister", verifyToken, verifyUser);

module.exports = router;