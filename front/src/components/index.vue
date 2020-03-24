<template>
    <div style="height: 100%;">
        <el-col :span="4" style="height: 100%;"><div class="menu">
          <router-link to="/index" exact class="menus">
                <p><i class="el-icon-folder"></i>文件</p>
          </router-link>
          <router-link to="/index/upload" exact class="menus">
            <p><i class="el-icon-upload2"></i>上传</p>
          </router-link>
         <div class="banben">版本号:0.0.01测试版 作者:LiPeiZhang<br/>项目地址:<a href="https://github.com/PeiZhang-Li/Tokenlogin.git" class="xi">https://github.com/PeiZhang-Li/Tokenlogin.git</a></div>
        </div></el-col>
        <el-col :span="20" style="height: 100%">
          <router-view/>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{

            }
        },
      methods:{

      },
      created() {

      }
    }
</script>

<style scoped>
.menu{
  color: #F4F4F4;
   border-right:1px solid #dcdcdc;
  height: 100%;
  position: relative;
}
  .menus{
    display: block;
    height: 50px;
    border-bottom: 1px solid #dcdcdc;
    text-align: center;
    line-height: 50px;
    color: #333;
  }
  i{
    margin-right: 10px;
  }
  .banben{
    color: #dcdcdc;
    font-size: 12px;
    text-align: center;
    position: absolute;
    bottom: 20px;
  }
  .xi{
    color: #dcdcdc;
  }
  .router-link-active{
    background: #007DFF;
    color: #fff;
  }
</style>
