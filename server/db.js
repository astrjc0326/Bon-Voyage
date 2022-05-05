const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect(`mongodb://localhost:27017/flightList`);
// 2. Set up any schema and models needed by the app
let flightSchema = mongoose.Schema({
  fly_from: String,
  fly_to: String,
  price: Number,
  url: String
})

let Flight = mongoose.model('Flight', flightSchema);
// 3. Export the models
let get = (callback) => {
  Flight.find((err, result) => {
    if (err) {
      callback(err)
    } else {
      callback(null, result)
    }
  })
};


let save = (flight, callback) => {
  Flight.create(flight, (err, result) => {
    if (err) {
      console.log(err)
      callback(err);
    } else {
      callback(null, result)
    }
  })
}

let deleteFlight = (id, callback) => {
  Flight.findByIdAndDelete(id, (err, result) => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  })
}

let update = (data, callback) => {
  let id = data._id;
  delete data._id;
  Flight.findByIdAndUpdate(id, data, (err, result) => {
    if (err) {
      callback(err)
    } else {
      console.log(result);
      callback(null, result)
    }
  })
}

let filter = (word, callback) => {
  let key ='.*' + word + '.*'
  console.log('key:', key)
  Word.find({word: new RegExp(key)}, (err, result) => {
    if (!err) {
      console.log(result)
      callback(null, result)
    }
  })

}

module.exports.get = get
module.exports.save = save
module.exports.deleteFlight = deleteFlight
module.exports.update = update
module.exports.filter = filter