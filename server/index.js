const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require("./model/UserSchema");
require('dotenv').config();

const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Create an Express router
const router = express.Router();

router.get("/", (req, res) => {
    Users.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
});

router.post("/Create", (req, res) => {
    Users.create(req.body)
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err));
});

router.get("/update/:id", (req, res) => {
    const id = req.params.id;
    Users.findById(id)
      .then(users => res.json(users))
      .catch(err => res.status(404).json(err));
});

router.patch("/update/:id", (req, res) => { 
    const id = req.params.id; 
    Users.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    Users.findByIdAndDelete(id)
        .then(() => Users.find())
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

// ✅ Mount on Netlify function base route + /api + /
app.use('/.netlify/functions/index', router);
app.use('/api', router);
app.use('/', router);

// Only listen on PORT during local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
        console.log("Server Started at Port:", PORT);
    });
}

// Export serverless handler for Netlify
module.exports.handler = serverless(app);