const express = require("express");
const {getList, register, unregister, feedback} = require("../controllers/fest");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/getlist", verifyToken, getList);
router.post("/register", verifyToken, register);
router.post("/unregister", verifyToken, unregister);
router.post("/feedback", verifyToken, feedback);

module.exports = router;