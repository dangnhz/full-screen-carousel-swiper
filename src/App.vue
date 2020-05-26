<template>
  <div id="app" >
    <navigation-bar></navigation-bar>
    <global-cursor></global-cursor>
  <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar'
import GlobalCursor from './components/GlobalCursor'
  export default {
    name:'app',
    components: {
      GlobalCursor,
      NavigationBar
    }
  }
</script>

<style lang="less">

body{
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: 0;
  &::-webkit-scrollbar {
    width: 0;
  }

}


*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;

}

a {
  text-decoration: none !important;
}

ul, li {
  list-style: none;
}
</style>