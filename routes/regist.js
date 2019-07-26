
var express=require('express')
var router=express.Router();
var User = require('../modules/db/user');
var md5 = require('md5');



// 注册

router.get('/regist',(req,res)=>{
    // console.log(req.flash('error').toString());
    // 从flash暂存器中取出 error 的值
    // var error = req.flash('error').toString();
    res.render('regist');
});

router.post('/regist',(req,res)=>{
    User.findOne({username:req.body.username},(err,data)=>{
        if (data) {
            // res.send('用户名已被抢注');
            // 在flash暂存器中添加一个 error 信息
            req.flash('error','用户名已被抢注');
            res.redirect('/regist')
        } else {
            // 对密码进行MD5加密
            req.body.password = md5(req.body.password);
            var userObj=Object.assign(req.body,{
                headerurl:'/img/timg.jpg'
            })
            var u=new User(userObj)
            // var user = new User(req.body);
            // console.log(user);
            u.save(err=>{
                res.redirect('/login');
            });
        }
    });
});

module.exports=router;