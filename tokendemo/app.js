let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let mongodb = require('./mongo');
let sendemail=require('./sendemail');
let objectId = require('mongodb').ObjectID
app.use('/upload', express.static('upload'));
let multiparty=require('multiparty')
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
                  'imgurl':resq[0].touxiang||''
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
app.post('/setuserinfo',(req,res)=>{
    //设置用户头像
    let form = new multiparty.Form();
    form.uploadDir = "upload/userinfo"; //设置文件上传的目录
    form.parse(req,(err, fields, files)=>{
        if(files){
            //有文件上传走这里
            let filepath = files.file[0].path;//文件地址
            let filesize = files.file[0].size;//文件大小
            let userinfo=JSON.parse(fields.userinfo[0])
            let email=userinfo.email;
            let username=userinfo.username;
            mongodb.cha('user','root',{'email':email}).then(resq=>{
               if(resq[0].touxiang){
                   fs.unlink(resq[0].touxiang,()=>{
                       mongodb.xiu('user','root',{'email':email},{'username':username})
                       mongodb.xiu('user','root',{'email':email},{'touxiang':filepath})
                       res.send('1')
                   })
               }else{
                   mongodb.xiu('user','root',{'email':email},{'username':username})
                   mongodb.xiu('user','root',{'email':email},{'touxiang':filepath})
                   res.send('1')
               }
            })
        }else{
            //没有文件上传
          for(i in  req.body){
             let email=JSON.parse(i).email;
             let username=JSON.parse(i).username;
              mongodb.xiu('user','root',{'email':email},{'username':username}).then(resq=>{
                 if(resq==1){
                     res.send('1')
                 }else{
                     res.send('-1')
                 }
              })
          }
        }
    })
});
app.post('/setphoto',(req,res)=>{
    let form = new multiparty.Form();
    form.uploadDir = "upload/photo"; //设置文件上传的目录
    form.parse(req,(err,fields, files)=>{
        let userinfo=JSON.parse(fields.usertime)
        let path=files.myFile[0].path;//文件地址
        let filename=files.myFile[0].originalFilename;
        let email=userinfo.email;
        let time=userinfo.time;
        let obj={
            email,
            time,
            path,
            filename
        }
        mongodb.zeng('user','photo',obj,{'path':path}).then(resq=>{
            res.end()
        })
    })

})
app.post('/getphoto',(req,res)=>{
    for(let i in req.body){
        let email=JSON.parse(i);
        mongodb.cha('user','photo',email).then(resq=>{
               if(resq=='-1'){
                   res.send('-1')
               }else{
                   res.send(resq)
               }
        })
    }

 })
app.post('/removephoto',(req,res)=>{
    for(let i in req.body){
        let data=JSON.parse(JSON.parse(i).item)
        let _id=objectId(data._id);
        let path='upload\\photo\\'+data.path.split('\\')[1];
        fs.unlink(path,()=>{
            mongodb.shan('user','photo',{_id}).then((resq)=>{
                    res.send('1')
            })
        })
    }
})
app.listen(3000, () => {
    console.log('开始执行')
})