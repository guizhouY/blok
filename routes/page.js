var express=require('express')
var router=express.Router();
var Message = require('../modules/db/message');
router.get('/people',function(req,res){
    if(!req.session.user){
    res.send('请登录')
    }else{
        res.redirect('/page')
    }
    
})

// 个人页面展示
router.get('/page',(req,res)=>{
    Message
    .find()
    .populate('reples').populate('author')
    .exec((err,data)=>{
        var msgs = JSON.parse(JSON.stringify(data));
        var error = req.flash('error').toString();
        var cc=req.session.user
      console.log(msgs);
        res.render('page',{msgs});
        
    });
})
// 删除
router.get('/delete',(req,res)=>{
Message.findByIdAndDelete({_id:req.query._id},err=>{
    if(err){
        res.send('删除失败')
    }else{
        res.redirect('/page')
    }
})
})
//编辑
router.get('/edit',function(req,res){
    Message.findOne({_id:req.query._id},function(err,data){
        var bianji=JSON.parse(JSON.stringify(data));
    res.render('edit',{bianji})
        // console.log(bianji);
    })
   
})

router.post('/edit',function(req,res){
    // console.log(msg);
    // console.log('---------');
    // console.log(req.body._id);
   Message.updateOne({_id:req.body._id},{
       msg:req.body.msg
     
    },err=>{
        res.redirect('/page');
       
    });
   
})











module.exports=router;