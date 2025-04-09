const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies

// MongoDB connection URI (for local use)
const mongoURI = 'mongodb://localhost:27017/myDatabase';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ Connection error:', err));

// Define a Mongoose Schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Item = mongoose.model('Item', itemSchema);

// --- 🧪 CRUD API Endpoints ---

// CREATE (POST)
app.post('/items', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newItem = new Item({ name, description, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err });
  }
});

// READ ALL (GET)
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err });
  }
});

// READ ONE (GET)
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item', error: err });
  }
});

// UPDATE (PUT)
app.put('/items/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err });
  }
});

// DELETE (DELETE)
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
