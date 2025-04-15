// --- BACKEND --- (Node.js + Express)
// File: backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/complaints', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now },
});

const Complaint = mongoose.model('Complaint', ComplaintSchema);

app.post('/api/complaints', async (req, res) => {
  const complaint = new Complaint(req.body);
  await complaint.save();
  res.status(201).send(complaint);
});

app.get('/api/complaints', async (req, res) => {
  const complaints = await Complaint.find();
  res.send(complaints);
});

app.patch('/api/complaints/:id', async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(complaint);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
