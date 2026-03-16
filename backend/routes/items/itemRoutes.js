const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createItem,
  getItems,
  getItemById,
  deleteItem
} = require('../../controllers/items/itemController');

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
router.route('/')
  .post(upload.single('image'), createItem)
  .get(getItems);

router.route('/:id')
  .get(getItemById)
  .delete(deleteItem);

module.exports = router;
