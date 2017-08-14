const mongoose = require("mongoose")
const Schema = mongoose.Schema

const image_historySchema = new Schema({
  term: String,
  when: Date
})

module.exports = mongoose.model("image_history", image_historySchema)