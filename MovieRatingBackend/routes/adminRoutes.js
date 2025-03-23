const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/uploadMiddleware"); 

router.post("/add-movie", verifyToken, isAdmin, upload.single("image"), adminController.addMovie);
router.put("/edit-movie/:id", verifyToken, isAdmin, upload.single("image"), adminController.editMovie);
router.delete("/delete-movie/:id", verifyToken, isAdmin, adminController.deleteMovie);
router.delete("/delete-review/:id", verifyToken, isAdmin, adminController.deleteReview);

module.exports = router;
