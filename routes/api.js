const express = require("express")
const router = express.Router()

const imagesearch = require("./imagesearch/imagesearch")
const latest = require("./latest/latest")

router.use("/imagesearch", imagesearch)
router.use("/latest", latest)

router.get("*", (req, res)=>{
  res.redirect("/")
})

module.exports = router