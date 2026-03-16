const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  deleteItem
} = require('../../controllers/items/itemController');

// POST /api/items -> create item
// GET /api/items -> get all items
router.route('/')
  .post(createItem)
  .get(getItems);

// GET /api/items/:id -> get single item
// DELETE /api/items/:id -> delete item
router.route('/:id')
  .get(getItemById)
  .delete(deleteItem);

module.exports = router;
