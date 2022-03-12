const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var allocationSchema = new Schema({
    
   
    username: String,
    registerid : String,
    fname:String,
    sname:String,
    quali:String,
    course:String,
    comp:String,
    batch:String,
    emp:String,
    starttime:Number,
    endtime:Number,
    startdate:Date,
    enddate:Date,
    meeting:String,
    schedule:String,
    day:String
    
    
    
   
});

var Allocation = mongoose.model('allocations', allocationSchema);

module.exports = Allocation;