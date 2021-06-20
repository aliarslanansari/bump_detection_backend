const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const locationSchema = new Schema(
  {
    longitude: String,
    latitude: String,
    pincode: String,
  },
  { timestamps: true }
)

const BumpLocation = mongoose.model("BumpLocation", locationSchema)

module.exports = BumpLocation
