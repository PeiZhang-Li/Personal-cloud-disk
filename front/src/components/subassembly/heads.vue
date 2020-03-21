<template>
  <div class="headsa">
    <div class="weathers">
      <p v-if="water.length===0"><i class="el-icon-loading"></i>Lodging...</p>
      <h2>{{water.date}}</h2>
      <i class="el-icon-cloudy-and-sunny" v-if="water.weather=='多云'"></i>
      <i class="el-icon-sunny" v-if="water.weather=='晴天'"></i>
      <i class="el-icon-cloudy" v-if="water.weather=='阴天'"></i>
      <span>{{water.weather}}</span>
      <span>{{dushu}}</span>

    </div>
    <div class="userinfo">
      <div class="tou" style="text-align: center;line-height: 30px" @click="show">
        <i class="el-icon-user"></i>
      </div>
      <span style="font-size: 12px;text-align: center">好哥哥</span>
      <transition>
        <div class="menu" v-if="kg">
          <li>修改信息</li>
          <li @click="tuichu">退出登录</li>
        </div>
      </transition>
    </div>

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
        kg: false
      }
    },
    methods: {
      city() {    //定义获取城市方法
        const geolocation = new BMap.Geolocation();
        var _this = this;
        geolocation.getCurrentPosition(function getinfo(position) {
          let city = position.address.city;            //获取城市信息
          let province = position.address.province;     //获取省份信息
          _this.$axios.post(`/juhe/simpleWeather/query?key=ba891642b5c1f74dcd1a570269ff780e&city=${encodeURIComponent(city.substr(0, city.indexOf('市')))}`).then(res => {
            _this.water = res.data.result.future[0];
            localStorage.setItem('date', JSON.stringify(res.data.result.future[0].date))
            localStorage_Time.setAge(24 * 60 * 60 * 1000);//设置一天过期
            localStorage_Time.set('weather', JSON.stringify(res.data.result.future[0]))
            _this.dushu = res.data.result.future[0].temperature
          })
        }, function (e) {

        }, {provider: 'baidu'});
      },
      show() {
        this.kg = !this.kg;
      },
      tuichu() {
        localStorage.removeItem('weather')
        localStorage.removeItem('date')
        localStorage.removeItem('userinfo')
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
    mounted() {
      if (localStorage_Time.get('weather') && !localStorage_Time.isExpire('weather')) {
        this.water = JSON.parse(localStorage_Time.get('weather'));
        this.dushu = JSON.parse(localStorage_Time.get('weather')).temperature
      } else {
        this.city()
      }
    }
  }
</script>

<style scoped>
  .headsa {
    height: 50px;
    width: 100%;
    position: relative;
    border-bottom: 1px solid #dcdcdc;
  }

  .weathers {
    padding: 0 20px;
    height: 100%;
    float: right;
    border-right: 1px solid #dcdcdc;
    border-left: 1px solid #dcdcdc;
    position: relative;
  }

  .userinfo {
    padding: 0 20px;
    float: right;
    position: relative;
  }

  .tou {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin: 0 auto;
    cursor: pointer;
  }

  .menu {
    width: 150px;
    height: 80px;
    position: absolute;
    right: 0;
    top: 50px;
    border: 1px solid #dcdcdc;
  }

  .menu > li {
    height: 40px;
    width: 100%;
    border-top: 1px solid #dcdcdc;
    list-style: none;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }

  .menu > li:hover {
    background: #007DFF;
    color: #fff;
  }

  .v-enter, .v-leave-to {
    opacity: 0;
    transform: translateY(80px);
  }

  .v-enter-active, .v-leave-active {

    transition: all 0.5S ease
  }
</style>
