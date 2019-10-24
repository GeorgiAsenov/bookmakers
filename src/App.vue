<template>
  <div id="app">
    <general-layout></general-layout>
  </div>
</template>

<script>
import GeneralLayout from './layouts/GeneralLayout'

export default {
  name: 'app',
  components: { generalLayout: GeneralLayout }  
}
</script>

<style lang="scss">
  @import "assets/styles/main.scss";
</style>
