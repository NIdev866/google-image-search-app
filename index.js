"use strict"

const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGOLAB_URI)

const api = require("./routes/api")

app.use("/api", api)

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "static/index.html"))
})

app.get("*", (req, res)=>{
  res.redirect("/")
})

app.listen(process.env.PORT || 3000)