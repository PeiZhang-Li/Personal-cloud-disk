<template>
  <div style="height: 100%">
    <heads/>

    <div class="content" v-loading="loding">
      <div class="kong" v-if="!isdata">
        <i class="el-icon-folder-opened"></i>
        <p>没有文件</p>
      </div>
      <div class="mainbox" v-if="isdata">
        <div v-for="(item,index) of data" class="filecontent" :key="index">
          <div class="shijian"><i class="el-icon-caret-right"></i><span style="margin-left: 20px">{{index}}</span></div>
          <div class="filebox" v-for="(v,i) of item" :key="i+'x'">
            <div class="icons">
              <img :src="v.path" alt="" v-if="matchType(v.filename)=='image'" class="imgs">
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='ppt'">  <!--ppt-->
                <use xlink:href="#icon-ppt"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='excel'">  <!--excel-->
                <use xlink:href="#icon-excel"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='txt'">  <!--#icon-txt-->
                <use xlink:href="#icon-txt"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='zip'">  <!--#icon-yasuobao-->
                <use xlink:href="#icon-yasuobao"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='word'">  <!--#icon-word-->
                <use xlink:href="#icon-word"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='radio'">  <!--#icon-yinle-->
                <use xlink:href="#icon-yinle"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='video'">  <!--#icon-shipin-->
                <use xlink:href="#icon-shipin"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='pdf'">  <!--#icon-pdf-->
                <use xlink:href="#icon-pdf"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="matchType(v.filename)=='other'">  <!--#icon-wenjian-->
                <use xlink:href="#icon-wenjian"></use>
              </svg>
            </div>
            <p class="filename">{{v.filename}}</p>
            <transition name="tan">
              <div class="menu">
                <div class="iconx" @click="remove(index,v,i)"><i class="el-icon-delete"></i></div>
                <div class="iconx" @click="chakan(v)"><i class="el-icon-view"></i></div>
                <a  :href="v.path" download><div class="iconx"><i class="el-icon-bottom"> </i></div></a>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div v-if="med">
        <div class="media" v-if="url.length!==0">
          <i class="el-icon-close close" @click="close"></i>

          <iframe :src="url" frameborder="0" class="iframes" scroll="no"></iframe>

        </div>
        <div class="media" v-if="imgurl.length!==0">
          <i class="el-icon-close close" @click="close"></i>
          <el-image :src="imgurl" class="iframes"></el-image>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import heads from "./heads";

  export default {
    name: "photo",
    components: {heads},
    data() {
      return {
        loding: false,  //默认关闭,刷新屏蔽罩
        isdata: false,   //是否有数据
        times: [],     //时间轴数据
        data: null,
        url: '',      //视频地址
        med: true,
        imgurl: ''  //图片地址
      }
    },
    created() {
      document.body.parentNode.style.overflowY = "hidden";//隐藏默认滚动条
      this.getdata()
    },
    methods: {
      matchType(fileName) {
        // 根据文件名后缀区分 文件类型
        /*
         * @param: fileName - 文件名称
         * @param: 数据返回 1) 无后缀匹配 - false
         * @param: 数据返回 2) 匹配图片 - image
         * @param: 数据返回 3) 匹配 txt - txt
         * @param: 数据返回 4) 匹配 excel - excel
         * @param: 数据返回 5) 匹配 word - word
         * @param: 数据返回 6) 匹配 pdf - pdf
         * @param: 数据返回 7) 匹配 ppt - ppt
         * @param: 数据返回 8) 匹配 视频 - video
         * @param: 数据返回 9) 匹配 音频 - radio
         * @param: 数据返回 10) 匹配 压缩包 - zip
         * @param: 数据返回 11) 其他匹配项 - other
         */
        // 后缀获取
        var suffix = '';
        // 获取类型结果
        var result = '';
        try {
          var flieArr = fileName.split('.');
          suffix = flieArr[flieArr.length - 1];
        } catch (err) {
          suffix = '';
        }
        // fileName无后缀返回 false
        if (!suffix) {
          result = false;
          return result;
        }
        // 图片格式
        var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
        // 进行图片匹配
        result = imglist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'image';
          return result;
        }
        ;
        // 匹配txt
        var txtlist = ['txt'];
        result = txtlist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'txt';
          return result;
        }
        ;
        // 匹配 excel
        var excelist = ['xls', 'xlsx'];
        result = excelist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'excel';
          return result;
        }
        ;
        // 匹配 word
        var wordlist = ['doc', 'docx'];
        result = wordlist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'word';
          return result;
        }
        ;
        // 匹配 pdf
        var pdflist = ['pdf'];
        result = pdflist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'pdf';
          return result;
        }
        ;
        // 匹配 ppt
        var pptlist = ['ppt'];
        result = pptlist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'ppt';
          return result;
        }
        ;
        // 匹配 视频
        var videolist = ['mp4', 'm2v', 'mkv'];
        result = videolist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'video';
          return result;
        }
        ;
        // 匹配 音频
        var radiolist = ['mp3', 'wav', 'wmv'];
        result = radiolist.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'radio';
          return result;
        }
        //匹配压缩文件
        var yasuo = ['zip', 'rar', '7z', 'iso'];
        result = yasuo.some(function (item) {
          return item == suffix;
        });
        if (result) {
          result = 'zip';
          return result;
        }
        // 其他 文件类型
        result = 'other';
        return result;
      },
      getdata() {
        this.times = [];
        this.data = {};
        this.loding = true;
        let userInfo = JSON.parse(localStorage.getItem('userinfo'));
        let email = userInfo.email;
        this.$axios.post('/api/getphoto', {'email': email}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
          if (res.data == '-1') {
            //没有数据
            this.loding = false;
            this.isdata = false;
          } else {
            //有数据
            if (res.data.length == 0) {
              this.loding = false;
              this.isdata = false;
              return false;
            }
            let data = res.data;
            let obj = {}
            res.data.forEach((item, index) => {
              if (this.times.indexOf(item.time) === -1) {
                this.times.push(item.time)
                this.times.forEach(v => {
                  obj[v] = []
                })
              }
              if (res.data.length - 1 == index) {
                res.data.forEach((v, i) => {
                  let oldpath = v.path;
                  v.path = `/api/${oldpath.replace("\\", "/")}`
                  obj[v.time].push(v)
                  if (i == res.data.length - 1) {
                    this.data = obj;
                    this.loding = false;
                    this.isdata = true;
                  }
                })
              }
            })
          }
        })
      },
      remove(key, datas, i) {
        let data = this.data;
        data[key].splice(i, 1)
        if(data[key].length==0){
          delete data[key]
        }
        this.data = data;
         console.log(datas);
         let item={
             '_id':datas._id,
             'path':datas.path
         }
        this.$axios.post('/api/removephoto', {'item': JSON.stringify(item)}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
        })
      },
      chakan(fileinfo) {
        let filename = this.matchType(fileinfo.filename)
       if(filename=='zip'){
         this.$alert('暂时不支持压缩格式文件在线预览', '', {
           confirmButtonText: '确定'
         });
       }else if(filename=='other'){
         this.$alert('未知文件类型，暂不支持在线预览', '', {
           confirmButtonText: '确定'
         });
       }else if(filename=='image'){
         this.imgurl=fileinfo.path;
       }else if(filename=='video'){
         this.url=fileinfo.path;
       }else if(filename=='txt'){
         this.url=fileinfo.path;
       }else if(filename=='pdf'){
         this.url=fileinfo.path;
       }else if(filename=='video'){
         this.url=fileinfo.path;
       }else if(filename=='radio'){
         this.url=fileinfo.path;
       }else if(filename=='excel'||filename=='word'||filename=='ppt'){
         window.open(`http://view.officeapps.live.com/op/view.aspx?src=${fileinfo.path}`, "_blank")
       }
      },
      close() {
        this.med = false
        this.url = ''
        this.imgurl = ''
        setTimeout(() => {
          this.med = true
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }

  .kong {
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top: 300px;
  }

  .mainbox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .filebox {
    width: 120px;
    height: 140px;
    text-align: center;
    padding-top: 20px;
    margin-top: 20px;
    float: left;
    position: relative;
    margin-left: 20px;
    border: 1px solid transparent;
  }

  .filebox:hover {
    border: 1px solid #dcdcdc;
  }

  .filebox:hover > .menu {
    opacity: 1;
    bottom: 0;

  }

  .icons {
    font-size: 50px;
  }

  .filename {
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .shijian {
    height: 20px;
    width: 100%;
  }

  .imgs {
    width: 80%;
  }

  .filecontent {
    height: auto;
    width: 100%;
    min-width: 180px;
    overflow: hidden;
    margin-top: 20px;
    position: relative;
  }

  .menu {
    width: 120px;
    height: 40px;
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    bottom: -30px;
    opacity: 0;
    transition:all .3s;
  }

  .iconx {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    border-radius: 50%;
    float: left;
  }

  .iconx:hover {
    background: #007bff;
    cursor: pointer;
  }

  .media {
    width: 100%;
    height: 100%;
    z-index: 999;
    border: 1px solid #dcdcdc;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .iframes {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);


  }

  .close {
    font-size: 40px;
    color: #fff;
    position: absolute;
    right: 20px;
    top: 20px;
  }
</style>
