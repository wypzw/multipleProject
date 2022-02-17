<template>
  <div class="hello">
    hello, world!!
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
.hello {
  color: #42b983;
  font-size: 30px;
  display:flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}
</style>
