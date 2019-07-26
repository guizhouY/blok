var express=require('express')
var router=express.Router();
var Message = require('../modules/db/message');
router.get('/information',(req,res)=>{
    // console.log('============');
    var cot=0
    // console.log(req.query._id);
    Message
    .findOne({_id:req.query._id})
   
    .populate('reples').populate('author')
    .exec((err,data)=>{
        var msgs = JSON.parse(JSON.stringify(data));
    Message
    .updateOne({_id:req.query._id},{
        cot:msgs.cot+1
    },err=>{
       
        res.render('information',{msgs});
    })
       
        // res.send({msgs})
        // console.log(msgs);
        // console.log(msgs.reples.username);
    })
//   console.log(msgs.username);
    // res.send('ss')
    // console.log(cot);
})
module.exports=router;