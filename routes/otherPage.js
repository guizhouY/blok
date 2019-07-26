var express=require('express')
var router=express.Router();
var Message = require('../modules/db/message');
router.get('/otherPage',(req,res)=>{
//  if( req.query.username==req.session.user.username){
//         res.redirect('/page')
//     }else{
        var otusername=req.query.username;
        Message
        .find()
        .populate('reples').populate('author')
        .exec((err,data)=>{
            var msgs = JSON.parse(JSON.stringify(data));
            var error = req.flash('error').toString();
            var cc=req.session.user
          console.log(msgs);
            res.render('otherPage',{msgs,otusername});
        });
    // }
})
module.exports=router;