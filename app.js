var express = require('express');
var Message = require('./modules/db/message');



var app = express();
app.use(express.static('public'));
app.engine('html',require('express-art-template'));
app.use(express.urlencoded({extended:false}));

var artTmpEngine = require('./modules/art-tem-config');
artTmpEngine(app);

var User = require('./modules/db/user');

// 闪存
var flash = require('connect-flash');
app.use(flash());

var md5 = require('md5');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    //添加session的配置信息
    secret:'mylogin',
    resave:true,
    saveUninitialized:true,
    rolling:true,
    cookie:{
        maxAge:1000*60*60
    },
    store: new MongoStore({
        // 连接数据库
        url:'mongodb://127.0.0.1/session-login'
    })
}));

app.use(function(req,res,next) {
    app.locals.pages='热门博客'
    res.locals.user = req.session.user;
    res.locals.error = req.flash('error').toString();
    next();
});


// 搜索
app.get('/search',(req,res)=>{
    var cc=req.query.sousuo
    // console.log(cc);
    Message.find({
        // 多条件模糊查询
        $or:[
            {title:{$regex:req.query.sousuo,$options:'$i'}}, 
            {msg:{$regex:req.query.sousuo,$options:'$i'}}
                ]
    }).exec((err,data)=>{
        var msgs = JSON.parse(JSON.stringify(data));
        // console.log(msgs);
        res.render('search',{msgs})
    });
})

// 个人信息
app.get('/xinxi',(req,res)=>{
    User.findOne({username:req.session.user.username})
    .exec((err,datas)=>{
        // console.log('-------------');
        // console.log(req.session.user.username);
        // console.log(data);
        var users = JSON.parse(JSON.stringify(datas));
        console.log('============');
        console.log(users);
        res.render('userinfo',{users})
       
    })
})

//修改信息

//修改头像
app.get('/edit/user/header',(req,res)=>{
    res.render('editheader')
})




// 首页的路由
var indexRouter=require('./routes/index')
app.use(indexRouter)
// 注册的路由
var registRouter=require('./routes/regist')
app.use(registRouter)
//登录的路由
var loginRouter=require('./routes/login')
app.use(loginRouter)
//发布的路由
var publishRouter=require('./routes/publish')
app.use(publishRouter)
//回复的路由
var replyRouter=require('./routes/reply')
app.use(replyRouter)
//个人详情页的路由
var pageRouter=require('./routes/page')
app.use(pageRouter)
//点击跳转的详情页
var otherpageRouter=require('./routes/otherPage');
app.use(otherpageRouter)
//详情页
var informationRouter=require('./routes/infomation');
app.use(informationRouter)
//标签
var tagAllRouter=require('./routes/tagAll');
app.use(tagAllRouter);
//点击标签跳转页
var tagpageRouter=require('./routes/tagpage');
app.use(tagpageRouter);
//更新头像
var upload=require('./routes/upload')
app.use(upload)


app.listen(3000,()=>{
    console.log('node running');
});