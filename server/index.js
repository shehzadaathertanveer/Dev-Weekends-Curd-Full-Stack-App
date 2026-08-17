const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Users = require("./model/UserSchema")
require('dotenv').config();

const PORT = process.env.PORT || 8001;

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.get("/",(req,res)=>{

    const allUsers= Users.find()
    .then( users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post("/Create",(req,res)=>{
    Users.create(req.body)
    .then( users=>res.json(users))
    .catch(err=>res.json(err))
})

app.get("/update/:id",(req,res)=>{
    const id = req.params.id
    const User= Users.findById(id)
    .then( users=>res.json(users))
    .catch(err=>res.json(err))
})

app.patch("/update/:id", (req, res) => { 
    const id = req.params.id; 
    Users.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});


app.delete("/:id", (req, res) => {
    const id = req.params.id; 

    Users.findByIdAndDelete(id)
        .then(() => Users.find())
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

app.listen(PORT,()=>{console.log("Server Started at Port: ",PORT)})