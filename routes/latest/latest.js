const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const imageHistory = require("./../models/Image_history.model.js")

router.get("/imagesearch", (req, res)=>{
  
  imageHistory.find({}, (err, searches)=>{
    res.json(searches)
  })

})

router.get("*", (req, res)=>{
  res.redirect("/")
})

/*router.get("*", (req, res)=>{
  //if(req)
  //res.send(req.query)             WORKS
})*/


module.exports = router