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

// 1. Create a Router
const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

router.post("/Create", (req, res) => {
  Users.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

router.get("/update/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json(err));
});

router.patch("/update/:id", (req, res) => { 
  Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => Users.find())
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// 2. Mount the router on all paths Netlify might dispatch
app.use('/.netlify/functions/index', router);
app.use('/api', router);
app.use('/', router);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => console.log("Server Started at Port:", PORT));
}

module.exports.handler = serverless(app);