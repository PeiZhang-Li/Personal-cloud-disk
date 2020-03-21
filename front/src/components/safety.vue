<template>
  <div>
    <div class="box" ref="boxs">
      <div class="login">
        <div class="logo"></div>
        <p>Hello,云</p>
        <div class="inp">
          <el-input v-model="email" placeholder="请输入注册邮箱" class="inps" @input="yanzheng"></el-input>
          <p class="error" v-if="kg1">*邮箱格式不正确</p>
          <div class="fasong" @click="sendemali"><i class="el-icon-s-promotion"></i></div>
        </div>
        <div class="inp">
          <el-input v-model="yzcode" placeholder="请输入验证码" class="inps"></el-input>
          <div class="daoji" v-if="kg">{{time}}s</div>
        </div>
        <div class="inp">
          <el-input v-model="password" placeholder="请输入新密码" class="inps"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary" plain @click="modeifyPassWord">提交</el-button>
        </div>
        <div class="nextTO">
          <a href="/register" class="tabs">用户注册</a>
          <a href="/login" class="tabs">用户登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        email: '',
        yzcode: '',
        kg1: false,
        password: '',
        kg: false,
        time: 60
      }
    },
    methods: {
      yanzheng() {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (this.email.length === 0) {
          this.kg1 = false
        } else {
          if (mailReg.test(this.email)) {
            // alert("邮箱格式正确");
            this.kg1 = false
          } else {
            this.kg1 = true
          }
        }
      },
      sendemali() {
        if (!this.kg1 && !this.kg) {
          let data = this.$qs.stringify({'email': this.email})
          this.$axios.post('/api/safety', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
            if (res.data == '-1') {
              this.$alert('发送失败请检查', '', {
                confirmButtonText: '确定'
              });
            } else {
              //发送成功
              this.$alert('发送成功', '', {
                confirmButtonText: '确定'
              });
              this.kg = true;
              let settime = setInterval(() => {
                if (this.time != 0) {
                  this.time--;
                }
              }, 1000)
              setTimeout(() => {
                clearInterval(settime)
                this.kg = false;
                this.time = 60;
              }, 60000)
            }
          })
        } else {
          this.$alert('错误,请您稍后重试', '', {
            confirmButtonText: '确定'
          });
        }
      },
      modeifyPassWord() {
        if (this.email.length == 0 || this.yzcode.length == 0 || this.password.length == 0) {

          this.$alert('失败，请检查', '', {
            confirmButtonText: '确定'
          });
          return false;
        } else {
          let data = this.$qs.stringify({'email': this.email, 'yzcode': this.yzcode, 'password': this.password})
          this.$axios.post('/api/modeifyPassWord', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
            if (res.data == '-1') {
              this.$alert('失败，请检查', '', {
                confirmButtonText: '确定'
              });
            } else {
              //成功修改的回调
              this.$alert('修改成功', '', {
                confirmButtonText: '确定'
              });
            }
          })
        }
      }
    },
    created() {

    },
    mounted() {
      let height = document.documentElement.clientHeight;
      this.$refs.boxs.style.height = height + 'px'
      let that = this;
      window.onresize = function () {
        that.$refs.boxs.style.height = height + 'px'
      }
    }
  }
</script>

<style scoped>
  .box {
    min-width: 964px;
    min-height: 660px;
    height: 100%;
    background-image: url("../assets/bg.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
  }

  .login {
    width: 360px;
    height: 500px;
    background: #fff;
    margin: 0 auto;
    margin-top: 200px;
    overflow: hidden;
    text-align: center;
  }

  .logo {
    width: 64px;
    height: 44px;
    background-image: url("../assets/logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    margin: 0 auto;
    margin-top: 40px;
    overflow: hidden;
  }

  p {
    margin-top: 20px;
  }

  .inp {
    margin-top: 20px;
    position: relative;
  }

  .inps {
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btn {
    margin-top: 40px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }

  .nextTO {
    height: 30px;
    margin-top: 40px;
    font-size: 14px;

  }

  .nextTO > .tabs {
    display: inline-block;
    padding: 0 20px;
    color: #007DFF;
  }

  .error {
    color: red;
    position: absolute;
    font-size: 12px;
    left: 30px;
    top: 25px;
  }

  .fasong {
    width: 50px;
    height: 20px;
    border: 1px solid #333;
    position: absolute;
    top: 10px;
    right: 30px;
    border-radius: 5px;
  }

  .fasong:hover {
    background: #dcdcdc;
  }

  .daoji {
    color: #dcdcdc;
    width: 50px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 30px;
  }
</style>
