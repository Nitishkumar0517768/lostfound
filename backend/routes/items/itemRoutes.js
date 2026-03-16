const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  deleteItem
} = require('../../controllers/items/itemController');

router.route('/')
  .post(createItem)
  .get(getItems);

router.route('/:id')
  .get(getItemById)
  .delete(deleteItem);

module.exports = router;
