<template>
  <div>
    <heads/>
    <div class="dropbox">
      <h2 class="txt" v-if="files.length===0">把要上传的文件拖动到这里</h2>
      <div class="filebox" v-for="(item,index) of files">
          <p>{{item.name}}</p>
        <el-progress :percentage="item.uploadPercentage"></el-progress>
      </div>
    </div>

  </div>
</template>

<script>
  import heads from "./heads";
  export default {
    name: "upload",
    components:{heads},
    data() {
      return {
        files: []
      }
    },
    methods: {
      uploadFile: function (file) {
        console.log(file)
        var item = {
          name: file.name,
          uploadPercentage: 67   //完成的百分比
        };
        this.files.push(item);//稍后完成  ....
        let fd=new FormData();
        fd.append('myFile', file);
      },
      onDrag: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      onDrop: function (e) {
        e.stopPropagation();
        e.preventDefault();
        var dt = e.dataTransfer;
        for (var i = 0; i !== dt.files.length; i++) {
          this.uploadFile(dt.files[i]);
        }
      }
    },
    mounted() {
      var dropbox = document.querySelector('.dropbox');
      dropbox.addEventListener('dragenter', this.onDrag, false);
      dropbox.addEventListener('dragover', this.onDrag, false);
      dropbox.addEventListener('drop', this.onDrop, false);
      /*
      当把文件拖动到浏览器的拖动区域时，会触发三种事件：
      文件第一次进入拖动区时，触发 dragenter 事件
      文件在拖动区来回拖拽时，不断触发 dragover 事件
      文件已经在拖动区，并松开鼠标时，触发 drop 事件
      实现拖动上传，我们只需要关心 drop 事件。不过另外两个事件也需要监听，目的是阻止浏览器默认行为。
      如果不阻止，那么把文件拖到浏览器时，浏览器就会自动下载这个文件（默认行为），drop 事件触发不出来。
      * */
    }
  }
</script>

<style scoped>
  .dropbox {
    border: 2px dashed #007bff;
    min-height: 200px;
    text-align: center;
    line-height: 200px;
    box-sizing: border-box;
  }

  .txt {
    font-size: 14px;
    color: #dcdcdc;
  }

  .filebox {
    width: 100px;
    height: 50px;
    border: 1px solid #dcdcdc;
    margin-top: 40px;
    margin-left: 40px;
    line-height: 30px;
  }
</style>
