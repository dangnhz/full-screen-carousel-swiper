<template>
  <div id="main-slider">
    <swiper id="showcase-slider" ref="mySwiper" :options="swiperOptions">
      <!-- section slider -->
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="img-mask"></div>
        <div class="section-image" :style="`background-image: url(${slide.imageUrl})`"></div>
         <div class="showcase-link" @click="changeRoute(slide.id)">
          {{slide.title}}
        </div>
      </swiper-slide>
      <!-- /section slider -->
    </swiper>
    <div class="slider-navigation">
      <div class="btn-prev hoverable magnetic-button" ><b-icon-chevron-up></b-icon-chevron-up></div>
      <div class="btn-next hoverable magnetic-button "><b-icon-chevron-down></b-icon-chevron-down></div>
    </div>
    <div class="showcase-title-wrap no-stroked"></div>
    <div class="showcase-title-wrap stroked"></div>
    <div class="showcase-subtitle">
      <p class="subtitle" v-for="(item, index) in slides" :key="index"> {{ item.subtitle }}</p>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import gsap from "gsap";
import {mapGetters} from 'vuex'
export default {
  name: "main-slider",
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    changeRoute(id) {
      gsap.to('.showcase-subtitle, .title-number, .slider-navigation, .stroked', {
        opacity: 0,
        duration: 0.5
      })

      setTimeout(() => {
        this.$router.push(`/projects/${id}`)
      }, 1000)
    }
  }
  ,
  data() {
    return {
      swiperOptions: {
        direction: "vertical",
        mousewheel: true,
        speed: 800,
        pagination: {
          el: ".showcase-title-wrap",
          renderBullet: function(index, className) {
            return `<div class='tab__link ${className}'><div class='title'></div></div>`;
          }
        },
        navigation: {
          nextEl: ".btn-next",
          prevEl: ".btn-prev"
        }
        // Some Swiper option/callback...
      }
    };
  },
  computed: {
    
      ...mapGetters({slides:'allProjects'})
    ,
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    const noStrokedTitles = document.querySelectorAll(".no-stroked .tab__link .title");
    const strokedTitles = document.querySelectorAll(".stroked .tab__link .title");
    const subtitles  = document.querySelectorAll(".subtitle")

    // insert text for each bullets

    strokedTitles.forEach((title, index) => {
      title.innerHTML = `${
        this.slides[index].title
      } <span class='title-number'> ${
        index < 10 ? "0" + (index + 1) : index + 1
      } </span>`;
    });
    noStrokedTitles.forEach((title, index) => {
      title.innerHTML = `${
        this.slides[index].title
      } <span class='title-number'> ${
        index < 10 ? "0" + (index + 1) : index + 1
      } </span>`;
    });

    this.swiper.on("slideChange", () => {
      let prevIndex = this.swiper.previousIndex;
      let activeIndex = this.swiper.realIndex;
      const boxHeight = document.querySelector('.no-stroked').getBoundingClientRect().height;
      // console.log(boxHeight)
      // console.log(prevIndex, activeIndex);

      if (prevIndex < activeIndex) {
        // console.log("srcoll down");
        strokedTitles.forEach(title => {
          gsap.to(title, { y: -`${activeIndex}` * boxHeight });
        });
        noStrokedTitles.forEach(title => {
          gsap.to(title, { y: -`${activeIndex}` * boxHeight });
        });

        subtitles.forEach(subtitle => {
          gsap.to(subtitle, {yPercent: -`${activeIndex}` * 100 })
        })
      } else {
        // console.log("scroll-up");
        strokedTitles.forEach(title => {
          gsap.fromTo(
            title,
            { y: -`${prevIndex}` * boxHeight },
            { y: -`${activeIndex}` * boxHeight }
          );
        });
        noStrokedTitles.forEach(title => {
          gsap.fromTo(
            title,
            { y: -`${prevIndex}` * boxHeight },
            { y: -`${activeIndex}` * boxHeight }
          );
        });

        subtitles.forEach(subtitle => {
          gsap.fromTo(
            subtitle,
            { yPercent: -`${prevIndex}` * 100 },
            { yPercent: -`${activeIndex}` * 100 }
          );
        })
      }
    });
  }
};
</script> 
<style lang="less">
@import '../assets/style/setting.less';

#main-slider {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  #showcase-slider {
    width: 100%;
    height: 100vh;
    .swiper-slide {
      position: relative;
    }
    .img-mask {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background: black;
      opacity: 0.1;
      pointer-events: none;
    }

    .section-image {
      width: 100%;
      height: 100vh;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .showcase-link {
      position: absolute;
      z-index: 4;
      font-weight: 700;
      text-transform: uppercase;
      color: @text-color;
      top: calc(50vh - 100px);
      font-size: 60px;
      line-height: 100px;
      left: 5rem;
      opacity: 0;
      height: 0;
      background: red;
      cursor: pointer;
      @media @mobile {
        top: calc(50vh - 40px);
        font-size: 30px;
        line-height: 60px;
        left: 1rem;
      }
       @media @tablet {
        top: calc(50vh - 40px);
        font-size: 50px;
        line-height: 100px;
        left: 2rem;
      }

      @media @large-desktop {
        font-size: 100px;
        line-height: 200px;
        left: 12vw;
      }
      
    }
  }

  .slider-navigation {
    transition: opacity 0.8s;
    position: absolute;
    z-index: 3;
    bottom: 2rem;
    right: 3rem;
    color: white;
    display: flex;

    .btn-prev,
    .btn-next {
      outline: none;
      user-select: none;
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid white;
      line-height: 2rem;
      font-size: 1.5rem;
      opacity: 0.5;
      cursor: pointer;
      text-align: center;
      margin-left: 1rem;
      transition: 0.5s;
      &:hover {
        opacity: 1;
      }
      @media @mobile {
        font-size: 1.2rem;
      }
    }
  }

  .showcase-title-wrap {
    position: absolute;
    z-index: 3;
    top: calc(50vh - 200px);
    left: 8rem;
    height: 100px;
    overflow: hidden;
    pointer-events: none;
    box-sizing: border-box;

    @media @mobile {
        left: 1rem;
        top: calc(50vh - 100px);
        height: 60px;
    }
    @media @tablet {
      left: 2rem;
      top: calc(50vh - 140px);
      height: 100px;
    }

    @media @large-desktop {
      left: 12vw;
      top: calc(50vh - 300px);
      height: 200px;
    }

    .tab__link {
      box-sizing: border-box;
      width: 100vw;
      height: auto;
      background: transparent;
      color: white;
      display: block;
      outline: 0;
      background: #333;
      border-radius: 0;
      .title {
        transition: 0.1s;
        text-transform: capitalize;
        text-align: left;
        font-weight: 700;
        font-size: 60px;
        line-height: 100px;
        width: fit-content;
        height: fit-content;
        position: relative;

        @media @mobile {
        font-size: 30px;
        line-height: 60px;
        }
        @media @tablet {
          font-size: 50px;
          line-height: 100px;
        }
        @media @large-desktop {
          font-size: 100px;
          line-height: 200px;
        }
        .title-number {
          font-size: 1rem;
          color: white;
          position: absolute;
          top: -15px;
          left: calc(100% + 15px);
          transition: opacity 1s;
          @media @mobile {
            font-size: 0.8rem;
            top: -8px
          }
          @media @tablet {
            font-size: 0.8rem;
            top: -15px
          }
          @media @large-desktop {
            font-size: 1rem;
            top: -25px
          }
        }
      }
    }
    .swiper-pagination-bullet {
      background: transparent;
      opacity: 0.5;
    }
    .swiper-pagination-bullet-active {
      background: transparent;
      opacity: 0.5;
    }
  }
  .showcase-title-wrap.no-stroked {
    margin-top: 100px;
    @media @mobile {
        margin-top: 60px;
    }
    @media @tablet {
      margin-top: 100px;
    }
    @media @large-desktop {
      margin-top: 200px;
    }
    .swiper-pagination-bullet {
      background: transparent;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: transparent;
    }
  }
  .showcase-title-wrap.stroked {
    transition: opacity 1s;
    padding-top: 100px;
    height: 300px;
     @media @mobile {
        padding-top: 60px;
        height: 180px;
    }
    @media @tablet {
      padding-top: 100px;
      height: 300px;
    }
    @media @large-desktop {
      padding-top: 200px;
      height: 600px;
    }
    .title {
      // -webkit-text-stroke: 1px rgba(255, 255, 255, 1);
      // -webkit-text-fill-color: transparent;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .showcase-subtitle {
    position: absolute;
    bottom: 3rem;
    left: 8rem;
    z-index: 5;
    color: white;
    height: 2rem;
    overflow: hidden;
    @media @mobile {
      left: 1rem;
      font-size: 1rem;
    }
    @media @tablet {
      left: 2rem;
    }
    @media @large-desktop {
      left: 12vw;
    }
    .subtitle {
      text-transform: capitalize;
      line-height: 2rem;
      font-size: 1.2rem;
      padding: 0;
      margin: 0;
    }
  }
}
</style>