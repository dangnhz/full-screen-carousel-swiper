<template>
  <div class="home">
    <!-- <page-loader></page-loader> -->
    <main-slider></main-slider>
  </div>
</template>

<script>
//import PageLoader from '../components/PageLoader'
import MainSlider from '../components/MainSlider'

export default {
  name: 'Home',
  components: {
    MainSlider,
    //PageLoader
  }
}
</script>
