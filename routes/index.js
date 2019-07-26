
var express=require('express');
var Message = require('../modules/db/message');
var tools = require('../modules/tools');
var router=express.Router();

// 点击首页跳转
router.get('/list',(req,res)=>{
    res.redirect('/')
})


// 展示内容
router.get('/',(req,res)=>{
    var page =  (req.query.page || 1)*1;
var show_count = 3;
    Message
    .find()
    .skip((page-1)*show_count) 
    .limit(show_count)
    .sort({age:1}) 
    .populate('reples').populate('author')
    .exec((err,data)=>{
        var msgs = JSON.parse(JSON.stringify(data));
        var error = req.flash('error').toString();
        Message.countDocuments((err,count)=>{
            var allPages =  Math.ceil(count/show_count);
            res.render('index',{
                msgs,
                page,
                allPages,
                show_count
            });
        });    
    });
})
module.exports=router;