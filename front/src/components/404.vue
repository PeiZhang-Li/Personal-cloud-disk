<template>
      <div style="margin: 0 auto">
        <img src="../assets/404.jpg" alt="">
      </div>
</template>

<script>
    export default {
        name: "404",
      created() {
          setTimeout(()=>{
            this.$router.push('/')
          },3000)
      }
    }
</script>

<style scoped>

</style>
