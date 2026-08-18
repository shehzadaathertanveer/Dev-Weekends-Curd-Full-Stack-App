const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require("./model/UserSchema");
require('dotenv').config();

const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// 1. Dynamic path prefix stripper (Fixes 404 for both GET / and POST /Create)
app.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/index')) {
    req.url = req.url.replace('/.netlify/functions/index', '');
  }
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace('/api', '');
  }
  if (req.url === '' || req.url === '/api') {
    req.url = '/';
  }
  next();
});

// 2. Direct Routes
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

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => console.log("Server Started at Port:", PORT));
}

module.exports.handler = serverless(app);