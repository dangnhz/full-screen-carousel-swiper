<template>
    <div id="page-loader">
        <span id="loader-item"></span>
    </div>
</template>

<script>
import gsap from 'gsap';
    export default {
        name: 'page-loader',
        
    mounted () {
        let timeline = gsap.timeline()
        timeline
        .from('#loader-item', {
            xPercent:-100,
            duration: 1.5
        })
        .fromTo("#loader-item", {
            height:'2px',
            duration:0.8,
            ease: "power2.out"
        }, 
        {
            height: '100vh'
        })
        .to('#page-loader', {
            opacity:0,
            visibility: 'invisible',
            display:'none',
            duration:1
        })
    }
    }
</script>

<style lang="less" scoped>
@import "../assets/style/setting.less";
#page-loader {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: black;
    z-index: 99999;
    pointer-events: none;
    #loader-item {
        height: 2px;
        width: 100%;
        background: white;
        display: block;
    }
}
</style>