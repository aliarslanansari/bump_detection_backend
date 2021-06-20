const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const constants = require("./constants.js")
const BumpLocation = require("./bumpSchema.js")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose
  .connect(constants.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database")
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err)
    process.exit()
  })

app.post("/save", function (req, res) {
  var bumpLocation = new BumpLocation({
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    pincode: req.body.pincode,
  })

  bumpLocation.save(function (err, data) {
    if (err) {
      console.log(error)
      res.status(401).send("An error occured")
    } else {
      res
        .json({
          message: "Location Added",
        })
        .status(200)
    }
  })
})

app.get("/coordinates", function (req, res) {
  BumpLocation.find(function (err, data) {
    if (err) {
      console.log(err)
      res.send("An error occured").status(501)
    } else {
      console.log(data)
      if (data.length) {
        res.send(data)
      } else {
        res.send("No record found").status(404)
      }
    }
  })
})

app.listen(3000, function () {
  console.log("listening on 3000")
})
