const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    phone_number: String,
    department:String,
});

module.exports = mongoose.model('User',userSchema);