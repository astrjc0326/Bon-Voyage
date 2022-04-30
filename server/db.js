const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect(`mongodb://localhost:27017/flightList`);
// 2. Set up any schema and models needed by the app
let wordSchema = mongoose.Schema({
  word: String,
  definition: String,
  italicize: {type: Boolean, default: false},
  emphasize: {type: Boolean, default: false}
})

let Word = mongoose.model('Word', wordSchema);
// 3. Export the models
let get = (limit, skip, callback) => {
  Word.find().limit(limit).skip(skip).exec(callback);
  // (err, result) => {
  //   console.log(limit, skip)
  //   if (err) {
  //     console.log('can\'t find the data')
  //   } else {
  //     callback(null, result)
  //   }
  // })
};

let count = (callback) => {
  Word.count(callback)
}
// 4. Import the models into any modules that need them

let save = (data, callback) => {
  let word = data.word;
  let definition = data.definition;
  Word.findOne({word}, (err, result) => {
    if (err) {
      console.log('finding err')
    } else {
      if (!result) {
        Word.create({word, definition}, (err, result) => {
          if (err) {
            console.log('can\'t save the data')
            callback(err)
          } else {
            console.log(result);
            callback(null, 'stored')
            // console.log('stored successfully')
          }
        })
      } else {
        callback(null, 'word exsited')
        // console.log('word exsited')
      }
    }
  })
}

let deleteWord = (id, callback) => {
  Word.findByIdAndDelete(id, (err, result) => {
    if (err) {
      callback(err)
      console.log('can\'t delete')
    } else {
      callback(null)
      console.log('delete successfully')
    }
  })
}

let update = (data, callback) => {
  let id = data._id;
  delete data._id;
  Word.findByIdAndUpdate(id, data, (err, result) => {
    if (err) {
      console.log('can\'t update')
      callback(err)
    } else {
      console.log('updated')
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
module.exports.deleteWord = deleteWord
module.exports.update = update
module.exports.filter = filter
module.exports.count = count