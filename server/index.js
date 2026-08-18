const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./model/UserSchema');
require('dotenv').config();

const app = express();

// ✅ Configured CORS options for Vercel + Netlify frontend
const corsOptions = {
  origin: ['https://crudoperationsde.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.get("/", (req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.post("/Create", (req, res) => {
  Users.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

app.get("/update/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json(err));
});

app.patch("/update/:id", (req, res) => { 
  Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

app.delete("/:id", (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => Users.find())
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => console.log("Server Started at Port:", PORT));
}

module.exports = app;