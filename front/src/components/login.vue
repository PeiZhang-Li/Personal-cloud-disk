<template>

        <div class="box" ref="boxs">
               <div class="login">
                   <div class="logo"></div>
                   <p>Hello,云</p>
                    <div class="inp">
                      <el-input v-model="email" placeholder="请输入注册邮箱" class="inps"></el-input>
                    </div>
                 <div class="inp">
                   <el-input v-model="password" placeholder="请输入密码" class="inps" type="password"></el-input>
                 </div>
                 <div class="btn">
                   <el-button type="primary" plain @click="login">登录</el-button>
                 </div>
                 <div class="nextTO">
                   <a href="" class="tabs">用户注册</a>
                   <a href="" class="tabs">找回密码</a>
                 </div>
               </div>
        </div>

</template>

<script>

    export default {
        name: "login",
      data(){
          return{
                 email:'',
                 password:''
          }
      },
      methods:{
          login(){
            let token= localStorage.getItem('token')||'';
            if(token.length!=0){
               localStorage.removeItem('token')
            }
          let data= this.$qs.stringify({'email':this.email,'password':this.password})
            this.$axios.post('/api/login',data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                if(res.data=='-1'){
                  this.$alert('用户名或者密码不正确', '', {
                    confirmButtonText: '确定'
                  });
                }else{
                  //本地存储token
                  localStorage.setItem('token',res.data.token)
                  localStorage.setItem('userinfo',JSON.stringify(res.data.userinfo))
                  this.$router.push('/')
                }
            })
          }
      },
      created() {

      }
    }
</script>

<style scoped>
  .box{
    min-width: 964px;
    min-height: 660px;
    height: 100%;
    background-image:url("../assets/bg.jpg") ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
  }
  .login{
    width: 360px;
    height: 455px;
    background: #fff;
    margin: 0 auto;
    margin-top: 200px;
    overflow: hidden;
    text-align: center;
  }
  .logo{
    width: 64px;
    height: 44px;
    background-image: url("../assets/logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size:70% ;
    margin: 0 auto;
    margin-top: 40px;
    overflow: hidden;
  }
  p{
    margin-top: 20px;
  }
  .inp{
    margin-top: 20px;
  }
  .inps{
     padding: 0 20px;
    box-sizing: border-box;
  }
  .btn{
    margin-top: 40px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .nextTO{
    height: 30px;
    margin-top: 40px;
    font-size: 14px;

  }
  .nextTO>.tabs{
    display: inline-block;
     padding: 0 20px;
    color: #007DFF;
  }

</style>
