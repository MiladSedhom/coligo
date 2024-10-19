const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Announcement = require("../models/Announcement");

const getAllAnnouncements = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  const query = Announcement.find().sort({ createdAt: -1 });

  if (limit) {
    query.limit(limit);
  }

  const announcements = await query.exec();

  res
    .status(StatusCodes.OK)
    .json({ announcements, count: announcements.length });
};

const getAnnouncement = async (req, res) => {
  const announcementId = req.params.id;

  const announcement = await Announcement.findOne({ _id: announcementId });

  if (!announcement)
    throw new NotFoundError(`No announcement with id ${announcementId}`);

  res.status(StatusCodes.OK).json({ announcement });
};

const createAnnouncement = async (req, res) => {
  const { text } = req.body;

  const newAnnouncement = new Announcement({
    text,
  });

  const savedAnnouncement = await newAnnouncement.save();

  res.status(StatusCodes.CREATED).json(savedAnnouncement);
};

const updateAnnouncement = async (req, res) => {
  const announcementId = req.params.id;
  const { text } = req.body;

  const updatedAnnouncement = await Announcement.findOneAndUpdate(
    { _id: announcementId },
    { text },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json(updatedAnnouncement);
};

const deleteAnnouncement = async (req, res) => {
  const announcementId = req.params.id;

  const announcement = await Announcement.findOneAndRemove({
    _id: announcementId,
  });

  if (!announcement)
    throw new NotFoundError(`No announcement with id ${announcementId}`);

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
