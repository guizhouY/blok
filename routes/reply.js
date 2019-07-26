var express=require('express');
var router=express.Router();
var Message = require('../modules/db/message');
var tools = require('../modules/tools');
var Reply = require('../modules/db/reply');
router.post('/add/reply',(req,res)=>{
    console.log('---------回复的消息-----------------');
    // 1.先保存回复的消息
    var reply = new Reply({
        username:req.session.user.username,
        content:req.body.content,
        ip:tools.ipFormat(req.ip),
        time:tools.dateFormat(new Date())
    });
    console.log(reply);
    reply.save(err=>{
        console.log(reply);
        Message.findOne({_id:req.body._id},(err,msg)=>{
            // 2.找到回复的这条消息 msg，把回复内容的 id值保存到 msg.reples
            msg.reples.push(reply._id);
            msg.save(err=>{
                res.redirect('/information?_id='+msg._id);
            });
        });
    });

});
module.exports=router