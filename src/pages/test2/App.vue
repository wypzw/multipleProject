<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import "$pages/assets/styles/rule.scss";
html,
body,
#app {
  font-family: $fontFamily;
  font-size: 10px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  user-select: none;
}
</style>
