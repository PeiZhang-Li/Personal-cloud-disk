<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 *{
   margin: 0;
   padding: 0;
 }
 a{
   text-decoration: none;
 }
 .inps>.el-input__inner{
   border: 0;
   outline: none;
   border-radius: 0;
   border-bottom: 1px solid #333;
   caret-color:#007DFF;
 }
  html,body,#app{
    height: 100%;
  }
</style>
