<template>
  <div>
    <div class="box" ref="boxs">
      <div class="login">
        <div class="logo"></div>
        <p>Hello,云</p>
        <div class="inp">
          <el-input v-model="username" placeholder="请输入用户名" class="inps"></el-input>
        </div>
        <div class="inp">
        <el-input v-model="password" placeholder="请输入密码" class="inps" type="password"></el-input>
        </div>
        <div class="inp">
          <el-input v-model="email" placeholder="请输入邮箱" class="inps"  @input="yanzheng"></el-input>
          <p class="error" v-if="kg1">*邮箱格式不正确</p>
        </div>
        <div class="btn">
          <el-button type="primary" plain @click="register">注册</el-button>
        </div>
        <div class="nextTO">
          <a href="" class="tabs">立即登录</a>
          <a href="" class="tabs">找回密码</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "register",
      data(){
        return{
          username:'',
          password:'',
          email:'',
          kg1:false
        }
      },
      methods:{
        yanzheng() {
          const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          if(this.email.length===0){
            this.kg1 = false
          }else {
            if (mailReg.test(this.email)) {
              // alert("邮箱格式正确");
              this.kg1 = false
            } else {
              this.kg1 = true
            }
          }
        },
        register(){
          if(!this.kg1){
             let obj=this.$qs.stringify({'username':this.username,'password':this.password,'email':this.email})
              this.$axios.post('/api/register',obj,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                   if(res.data=='1'){
                     this.$alert('注册成功', '', {
                       confirmButtonText: '确定',
                       callback:()=>{
                         this.$router.push('login')
                       }
                     });
                   }else{
                     this.$alert('该用户已经存在', '', {
                       confirmButtonText: '确定'
                     });
                   }
              })
          }else{
            this.$alert('邮箱不正确', '', {
              confirmButtonText: '确定'
            });
          }
        }
      },
      created() {

      },
      mounted() {
        let height=document.documentElement.clientHeight;
        this.$refs.boxs.style.height=height+'px'
        let that=this;
        window.onresize=function () {
          that.$refs.boxs.style.height=height+'px'
        }
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
    height: 500px;
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
    position: relative;
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
  .error{
    color: red;
    position: absolute;
    font-size: 12px;
    left: 30px;
    top: 25px;
  }
</style>
