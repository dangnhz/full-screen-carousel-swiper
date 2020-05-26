<template>
  <div id="all-project">
    <!-- <page-loader></page-loader> -->
    <div class="all-project-header">
      <h1 class="page-title">Projects.</h1>
      <div class="line"></div>
    </div>
    <div class="all-project-container">
      <ul class="project-list">
        <li class="project-item" v-for="(project, index) in projects" :key="index">
          <h1
            class="project-title"
            @click="handleChangeRoute(project.id, index)"
            @mousemove="handleMouseMove($event, index)"
          >
            {{ project.title }}
            <span class="project-number">{{ index >= 10 ? index +1 : '0'+(index +1) }}</span>
          </h1>
          <h3 class="project-subtitle">{{ project.subtitle }}</h3>
          <div
            class="project-image"
            :id="`project-image-${index}`"
            :style="`background-image: url(${project.imageUrl})`"
          >
            <div class="image-overlay"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import PageLoader from '../components/PageLoader'
import gsap from "gsap";
export default {
  name: "all-project",
  components: {
    //PageLoader
  },
  data() {
    return {
      changeRoute: false
    };
  },
  computed: {
    projects() {
      return this.$store.getters.allProjects;
    }
  },
  methods: {
    handleChangeRoute(id, index) {
      const image = document.querySelector(`#project-image-${index}`);

      this.changeRoute = true;
      let timeline = gsap.timeline();
      timeline.to(".project-title, .project-subtitle, .overlay", {
        opacity: 0,
        duration: 0.5
      });
      timeline.to(image, {
        top: 0,
        left: 0,
        opacity: 1,
        clipPath: "inset(0 0 0 0)",
        width: "100%",
        height: "100vh",
        duration: 0.8
      });
      setTimeout(() => {
        this.$router.push({
          name: "project-detail",
          params: { id: id, animateTitle: true }
        });
      }, 1500);
    },
    handleMouseMove(e, index) {
      if (this.changeRoute) return;
      else {
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        let image = document.querySelector(`#project-image-${index}`);
        let imageWidth = image.getBoundingClientRect().width;
        let imageHeight = image.getBoundingClientRect().height;

        gsap.to(image, {
          left: mouseX - imageWidth / 2 + 150 + "px",
          top: mouseY - imageHeight / 2 + "px",
          duration: 1
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/setting.less";
#all-project {
  width: 100%;
  height: 100vh;
  background: @background-color;
  color: @text-color;
  padding-top: 10rem;
  position: relative;

  .all-project-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5rem;

    h1 {
      font-size: 100px;
      text-transform: capitalize;
      font-weight: 700;
      @media @mobile {
        font-size: 2.5rem;
      }

      @media @tablet {
        font-size: 60px;
      }
    }
    .line {
      display: block;
      height: 8px;
      width: 100px;
      background: #e44a5a;
      content: "";
      margin: 2rem;
    }
  }

  .all-project-container {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    padding-top: 5rem;
    padding-left: 5rem;
    // overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media @mobile {
      width: 100%;
      padding-left: 2rem;
    }

    @media @tablet {
      width: 90%;
    }

    .project-list {
      padding-bottom: 5rem;
      background: @background-color;
      .project-item {
        position: relative;
        margin: 5rem 0;
        display: flex;
        align-items: center;
        user-select: none;

        .project-title {
          text-transform: capitalize;
          font-size: 5rem;
          font-weight: 700;
          mix-blend-mode: difference;
          width: fit-content;
          color: white;
          position: relative;
          z-index: 0;
          transition: opacity fill 0.8s;
          cursor: pointer;

          @media @mobile {
            font-size: 2rem;
          }

          @media @tablet {
            font-size: 3.5rem;
          }
          .project-number {
            font-size: 1rem;
          }

          &:hover {
            z-index: 2;
            opacity: 1;
            -webkit-text-stroke: 0px;
            // -webkit-text-fill-color: white;
          }
        }

        .project-title:hover ~ .project-image {
          display: block;
          clip-path: inset(0 0 0 0);
          z-index: 1;
        }
        .project-title:hover ~ .project-subtitle {
          opacity: 1;
        }

        .project-subtitle {
          text-transform: capitalize;
          font-size: 1rem;
          position: absolute;
          opacity: 0;
          right: 5rem;
          transition: 0.5s;
        }

        .project-image {
          width: 500px;
          height: 330px;
          position: fixed;
          z-index: 1;
          transition: clip-path 0.4s;
          clip-path: inset(0 100% 0 0);
          background-position: center center;
          background-repeat: none;
          background-size: cover;

          .image-overlay {
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.1;
          }
        }
      }
    }
  }
}
</style>