const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });
const Item = require('./backend/models/Item');

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const count = await Item.countDocuments();
    console.log(`Total items in database: ${count}`);
    const items = await Item.find().limit(5);
    console.log('Sample items:', JSON.stringify(items, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkData();
