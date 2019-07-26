var express=require('express')
var router=express.Router();
var Message = require('../modules/db/message');

router.get('/tagpage/:name',(req,res)=>{
    console.log(req.params.name);
    Message
    .find({tag:req.params.name})
    .exec((err,datas)=>{
 
        var data = JSON.parse(JSON.stringify(datas));
        res.render('tagpage',{data})
    })
})



module.exports=router;