const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var registerSchema = new Schema({
    fname: String,
    sname: String,
    email: String,
    mobile:String,
    address: String,
    password: String,
    username: String,
    job:String,
    org:String,
    registerid : String,
    quali : String,
    approval: Boolean,
    course: Array,
    image: String,
    emp: String,
    skill: Array
});

var Register = mongoose.model('registers', registerSchema);

module.exports = Register;







