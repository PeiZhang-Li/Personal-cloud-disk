<template>
  <div class="headsa">
    <el-dropdown style="float: right;margin-right: 40px;position: relative;">
  <div class="el-dropdown-link">
        <div class="userinfo">
          <div class="tou" style="text-align: center;line-height: 30px" @click="show" v-if="imgurl.length==0">
            <i class="el-icon-user" ></i>
          </div>
          <div  v-if="!imgurl.length==0">
            <el-image :src="imgurl"  class="tou" ></el-image>
          </div>
          <p class="p1">{{username}}</p>
  </div>
  </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><router-link to="/index/userinfo" style="color:#333"><li>修改信息</li></router-link></el-dropdown-item>
        <el-dropdown-item><router-link to="/safety" style="color:#333"><li>修改密码</li></router-link></el-dropdown-item>
        <el-dropdown-item><p @click="tuichu">退出登录</p></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
  import localStorage_Time from "../../localStorage_Time";

  export default {
    name: "heads",
    data() {
      return {
        water: '',
        dushu: '',
        kg: false,
        username:'',
        imgurl:''
      }
    },
    methods: {
      show() {
        this.kg = !this.kg;
      },
      tuichu() {
        console.log('触发')
        localStorage.removeItem('userinfo')
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
    created() {
      let userinfo=JSON.parse(localStorage.getItem('userinfo'))
      if(userinfo.imgurl.length==0){
        this.imgurl==''
      }else{
        this.imgurl=`/api/${userinfo.imgurl.replace("\\", "/")}`;
      }
      this.username=userinfo.username;
    }
  }
</script>

<style scoped>
  .headsa {
    height: 55px;
    width: 100%;
    position: relative;
    border-bottom: 1px solid #dcdcdc;
  }
  .userinfo {
    padding: 0 20px;

  }
  .tou {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 5px;
    cursor: pointer;
  }
.p1{
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  text-overflow: ellipsis;
}
</style>
