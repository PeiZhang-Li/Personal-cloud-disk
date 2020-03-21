let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let mongodb = require('./mongo');
let sendemail=require('./sendemail');
let axios=require('axios')
app.use(bodyParser.urlencoded({extended: false}));
app.post('/login', (req, res) => {
    //登录接口
    mongodb.cha('user', 'root', req.body).then(resq => {
        if (resq.length === 0) {
            res.send('-1')
        } else {
            //成功匹配就创建token
            // //生成token
            const token = jwt.sign(req.body, "suibian", {
                expiresIn: 86400,//一天过期
            });
            let obj={
                'username':resq[0].username||'',
                 'email':resq[0].email||'',
                  'imgurl':resq[0].toxiang||''
            }
            res.send({'userinfo':obj,'token':token})
        }
    })
});
app.post('/verify',(req,res)=>{
    //解码token
    // //解码
jwt.verify(req.body.token, 'suibian', function(err, decoded) {
    if(!err){
        res.send('1')
    }else{
        res.send('-1')
    }
})
});
app.post('/register', (req, res) => {
    //注册用户
    let obj = req.body;
    mongodb.zeng("user", "root", obj, {'email': req.body.email}).then((resq) => {
        if (resq === 1) {
            res.send('1')
        } else {
            res.send('-1')
        }
    })
});
let yzcode='';
app.post('/safety',(req,res)=>{
    //发送验证码
    let email = req.body.email;
    sendemail.sends(email).then(resq=>{
        if(resq=='-1'){
            res.send('-1')
        }else{
            yzcode=resq;
            setTimeout(()=>{
                yzcode=''
            },60000)//一分钟过期
            res.send('1')
        }
    })
})
app.post('/modeifyPassWord',(req,res)=>{
    //修改密码
let useryzcode=req.body.yzcode;
let email=req.body.email;
let password=req.body.password;
if(yzcode==useryzcode){
    mongodb.xiu('user','root',{'email':email},{'password':password}).then(resq=>{
        if(resq=='-1'){
            console.log('执行')
            res.send('-1')
        }else {
            res.send('1')
        }
    })
}else{
    res.send('-1')
}
})
app.listen(3000, () => {
    console.log('开始执行')
})