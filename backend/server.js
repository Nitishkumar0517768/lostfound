const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('LostFound API running');
});

// Routes
const itemRoutes = require('./routes/items/itemRoutes');
const claimRoutes = require('./routes/claims/claimRoutes');
app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
