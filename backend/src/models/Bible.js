const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: { ObjectId } } = Schema

const bibleSchema = new Schema({
    
book : {
    type: Number,
    required : true,
},

chapter :{
    type: Number,
    required : true,
},

verse :{
    type: Number,
    required : true,
},

content: {
    type: String,
    required : true,
},
title: {
    type: String,
    required : true,
},
})

const Bible = mongoose.model('Bible', bibleSchema, 'bibles')
module.exports = Bible

// const bibletest = new Bible({
//     book: 1,
//     chapter: 1,
//     verse: 1,
//     content :'test'
// })
// bibletest.save()
// .then(() => {
//     console.log('생성성공')
// })
// .catch((e) => {
//     console.log(`실패${e}`)
// })