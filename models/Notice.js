const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    title:String,
    body:String,
    category: {type:String,enum:['parking','covid','maintenance']},
    data: {type:Date, default:Date.now},
    user:{type:Schema.Types.ObjectId,ref:'User'},
})

module.exports = mongoose.model('Notice',noticeSchema);