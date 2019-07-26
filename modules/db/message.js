var mongoose = require('./connection');

var msgSchema = new mongoose.Schema({
    cot:Number,
    title:String,
    msg:String,
    time:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    reples:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'reply'
        }
    ],
    tag:Array,
});

var Message = mongoose.model('message',msgSchema);

module.exports = Message;