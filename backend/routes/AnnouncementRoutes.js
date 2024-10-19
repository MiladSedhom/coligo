const express = require("express");
const router = express.Router();

const {
  getAllAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/AnnouncementController");

router.get("/", getAllAnnouncements);
router.post("/", createAnnouncement);
router.get("/:id", getAnnouncement);
router.patch("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

module.exports = router;
