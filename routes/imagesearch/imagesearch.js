const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("dotenv").config()
const imageSearch = require("google-images")
const imageSearchClient = new imageSearch(process.env.CSE_ID, process.env.IMAGE_KEY)
const imageHistory = require("./../models/Image_history.model.js")


router.get("/:mySearch", (req, res)=>{

  const offset = req.query.offset ? req.query.offset : 1;
  const searchQuery = req.params.mySearch;
  const date = new Date().toISOString();

    client.search(searchQuery,{
      page: offset
    }).then(function(results){
      if(results.length >= 1){


        mongoose.connect(process.env.MONGOLAB_URI, function(err,db){
          if(err){
            res.json(results);
          } else {
            const imgSearchList = imageHistory({
              term: searchQuery,
              when: date
            })

            imgSearchList.save((err)=>{
              if(err) res.redirect("/")
            })

            res.json(results);
          }
        })


      } else {
        res.json('invalid search');
      }
    });













  const mySearch = req.params
  const offset = req.query.offset

  let offsetExists

  if(offset){
    offsetExists = true
  }
  else{
    offsetExists = false
  } 


  if(offsetExists)


  const response = {
    mySearch: mySearch,
    queries: {
      offset: offsetExists
    }
  }


  res.send(response)
})

router.get("*", (req, res)=>{
  res.redirect("/")
})


/*router.get("*", (req, res)=>{
  //if(req)
  //res.send(req.query)             WORKS
})*/


module.exports = router