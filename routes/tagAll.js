var express=require('express')
var router=express.Router();
var Message = require('../modules/db/message');
router.get('/tagAll',(req,res)=>{
    function arrFormat(arr){
        return Array.from(new Set(arr))
    }
    var tt=[]
    Message
    .find()
    .exec((err,data)=>{
        var msgs = JSON.parse(JSON.stringify(data));
     
      data.forEach((msg)=>{
          msg.tag.forEach(mag=>{
              tt.push(mag)
          })
      })
      var kk=arrFormat(tt)
      res.render('tagAll',{kk})
    })
})


module.exports=router;