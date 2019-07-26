var express=require('express')
var router=express.Router();
var User = require('../modules/db/user');
var md5 = require('md5');
router.get('/login',(req,res)=>{

    res.render('login');
});
router.post('/login',(req,res)=>{
    User.findOne({username:req.body.username},(err,user)=>{
        if (!user) {
          
            req.flash('error','用户名不存在');
            res.redirect('/login');
        } else {
            if (md5(req.body.password) == user.password) {
                req.session.user = user;
                res.redirect('/');
            } else {
               
                req.flash('error','密码错误');
                res.redirect('/login');
            }
        }
    });
});

// 退出登录
router.get('/logout',(req,res)=>{
    req.session.user = null;
    res.redirect('/');
});
module.exports=router;