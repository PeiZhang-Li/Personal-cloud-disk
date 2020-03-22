<template>
  <div>
    <heads/>
    <div class="box">
      <div style="position: relative"><p class="p1">用户名:</p>
        <el-input v-model="username" placeholder="用户名"></el-input>
      </div>
      <div class="imgt">
        <p class="p1">头像:</p>
        <el-image :src="imgurl" class="imgbox">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="margin-left: 12px;line-height: 40px"></i>
          </div>
        </el-image>

        <a href="javascript:;" class="file">选择文件
          <input type="file" ref="imgs" @change="files($event)"/>
        </a>
      </div>
      <el-button class="btn" @click="tijiao">提交</el-button>
    </div>
  </div>
</template>

<script>
  import heads from "./heads";

  export default {
    name: "userinfo",
    components: {heads},
    data() {
      return {
        username: '',
        imgfile: null,
        imgurl: '',
        email: ''
      }
    },
    methods: {
      files(e) {
        this.imgfile = e.target.files[0]
        this.imgurl = this.getObjectUrl(this.imgfile)
      },
      getObjectUrl(file) {
        let url = null;
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        }
        return url;
      },
      tijiao() {
        let formData = new FormData();
        let obj = {
          email: this.email,
          username: this.username
        }
        if (this.imgfile == null) {
          this.$axios.post('/api/setuserinfo', obj, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
             if(res.data==1){
               this.$alert('重新登录生效哦', '', {
                 confirmButtonText: '确定'
               });
             }else{
               this.$alert('网络开了会小差，请检查', '', {
                 confirmButtonText: '确定'
               });
             }
          })
        } else {
          formData.append('userinfo', JSON.stringify(obj));
          formData.append('file', this.imgfile)
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }; //添加请求头
          this.$axios.post('/api/setuserinfo', formData, config).then(res => {
            if(res.data==1){
              this.$alert('重新登录生效哦', '', {
                confirmButtonText: '确定'
              });
            }else{
              this.$alert('网络开了会小差，请检查', '', {
                confirmButtonText: '确定'
              });
            }
          })
        }

      }

    },
    created() {
      this.username = JSON.parse(localStorage.getItem('userinfo')).username;
      this.email = JSON.parse(localStorage.getItem('userinfo')).email;
    }
  }
</script>

<style scoped>
  .box {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    margin-top: 40px;

  }

  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    float: right;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }

  .imgt {
    margin-top: 20px;
    position: relative;
  }

  .p1 {
    position: absolute;
    left: -70px;
    top: 10px;

  }

  .imgbox {
    width: 40px;
    height: 40px;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
    float: left;
    overflow: hidden;
  }

  .btn {
    position: absolute;
    left: 55%;
    top: 250px;
  }
</style>
