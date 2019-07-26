var express=require('express');
var router=express.Router();
var Message = require('../modules/db/message');
var tools = require('../modules/tools');
// 点击发布跳转发布页面
router.get('/add',(req,res)=>{
    if(req.session.user){
        res.render('publish')
    }else{
          req.flash('error','请登录');
         res.send('请先登录')
    }
 
})


//发布博客
router.post('/add/msg',(req,res)=>{
    console.log('aa');
    if (req.session.user) {
        var m = new Message({
            author:req.session.user._id,
            msg:req.body.msg,
            time:tools.dateFormat(new Date()),
            title:req.body.title,
            reples:[],
            tag:req.body.tag
        });
       
        m.save((err)=>{
            if (err) {
                res.send('留言失败');
            } else {
                // res.send('')
                res.redirect('/');
            }
        }); 
        console.log(m);
        // res.send(req.session.user.username+'发帖成功');
    } else {
        // res.send('请登录');
        req.flash('error','请登录');
        res.redirect('/');
        
    }
});
module.exports=router;