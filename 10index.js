const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// MongoDB URI (use local or Atlas)
const mongoURI = 'mongodb://localhost:27017/votingApp';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema
const voteSchema = new mongoose.Schema({
  option: String,
  votes: { type: Number, default: 0 },
});
const Vote = mongoose.model('Vote', voteSchema);

// 📥 Get all votes
app.get('/votes', async (req, res) => {
  try {
    const votes = await Vote.find();
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving votes', error: err });
  }
});

// 🗳️ Cast a vote
app.post('/vote', async (req, res) => {
  const { option } = req.body;
  try {
    let vote = await Vote.findOne({ option });
    if (!vote) {
      vote = new Vote({ option, votes: 1 });
    } else {
      vote.votes += 1;
    }
    await vote.save();
    res.status(200).json(vote);
  } catch (err) {
    res.status(500).json({ message: 'Error casting vote', error: err });
  }
});

// 🧮 Get results (sorted)
app.get('/results', async (req, res) => {
  try {
    const results = await Vote.find().sort({ votes: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving results', error: err });
  }
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`🔊 Server running at http://localhost:${port}`);
});
