const Item = require('../../models/Item');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const itemData = { ...req.body };
    if (req.file) {
      itemData.image = req.file.filename;
    }
    const item = await Item.create(itemData);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all items
exports.getItems = async (req, res) => {
  try {
    const { search, type, page = 1, limit = 10 } = req.query;

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (type) {
      query.type = type;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const totalItems = await Item.countDocuments(query);
    const items = await Item.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalItems / limitNum);

    res.status(200).json({ 
      success: true, 
      items,
      totalItems,
      currentPage: pageNum,
      totalPages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Fetch a single item by id
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
