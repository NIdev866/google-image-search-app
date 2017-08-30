const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGOLAB_URI)
const imageHistory = require("./models/Image_history.model.js")
const imageSearch = require("google-images")
const imageSearchClient = new imageSearch(process.env.CSE_ID, process.env.IMAGE_KEY)

app.get("/api/imagesearch/:mySearch", (req, res)=>{
  const offset = req.query.offset ? req.query.offset : 1;
  const searchQuery = req.params.mySearch;
  const date = new Date().toISOString();
  imageSearchClient.search(searchQuery,{
    page: (offset)
  }).then(function(results){
    if(results.length > 0){
          const imgSearchList = imageHistory({
            term: searchQuery,
            when: date
          })
          imgSearchList.save((err)=>{
            if(err) res.redirect("/")
          })
          res.json(results);
    } 
    else {
      res.json('invalid search');
    }
  });
})

app.get("/api/latest/imagesearch", (req, res)=>{
  imageHistory.find({}, (err, searches)=>{
    if(err) res.redirect("/")
    res.json(searches)
  })
})

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "static/index.html"))
})

app.get("*", (req, res)=>{
  res.redirect("/")
})

app.listen(process.env.PORT || 3000)