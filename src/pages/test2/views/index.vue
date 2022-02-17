<template>
  <div class="indexPage">
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {

    }
  },
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/css/rule.scss";
.indexPage{
  display: flex;
  flex-flow: column;
}
.main-content{
  width: 100%;
  height: 100vh;
}
</style>
