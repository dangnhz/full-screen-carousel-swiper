<template>
  <div id="project-detail">
    <div class="project-container" v-if="project">
      <div class="section-hero">
        <div class="hero-background" @mousemove="moveBackground">
          <div class="hero-background-image" :style="`background-image: url(${project.imageUrl})`"></div>
          <div class="overlay"></div>
        </div>
        <div class="project-title">
          <h1 class="title">{{ project.title }}</h1>
          <h4 class="subtitle">{{ project.subtitle }}</h4>
        </div>

        <div class="scroll-down">
          <b-icon icon="arrow-down" animation="cylon-vertical" font-scale="2"></b-icon>
          <span class="text-scroll">Scroll</span>
        </div>
      </div>
      <div class="section-content">
        <div class="row col-md-10 col-lg-8 m-auto text-left pb-5">
          <div class="col-md-3 col-sm-12 p-0">
            <h4>Client</h4>
            <p>Aey Studio</p>
          </div>
          <div class="col-md-3 col-sm-12 p-0">
            <h4>Date</h4>
            <p>January 20, 2017</p>
          </div>
          <div class="col-md-3 col-sm-12 p-0">
            <h4>Team</h4>
            <p>John Doe - Animator</p>
            <p>Danny Ngo- Illustrator</p>
          </div>
          <div class="col-md-3 col-sm-12 p-0">
            <h4>Service</h4>
            <p>Animation, Motion Video</p>
          </div>
        </div>

        <div class="row col-md-10 col-lg-8 m-auto pb-5 pt-5">
          <h4 class="mb-3">Description</h4>
          <p
            class="text-left"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quos earum obcaecati tempora in distinctio accusamus unde, dolorem deserunt, consequuntur dolore pariatur a sapiente ex. Quas, eligendi! Amet ex voluptatibus dignissimos exercitationem quo deserunt laboriosam ipsa, rerum distinctio unde explicabo aut eius dolore ea sed iure cum maiores! Impedit iusto maiores saepe voluptate neque consectetur tempora vero quae obcaecati enim sunt, veritatis, doloribus ad totam error libero ducimus assumenda culpa non perspiciatis repellendus veniam voluptatum quisquam modi? Vero deserunt facilis earum eaque cum nulla fugiat quos, temporibus cumque amet obcaecati laborum quibusdam voluptates dolor, rem nihil dolores quaerat incidunt dolorum?</p>
        </div>

        <div class="row col-md-10 col-lg-8 m-auto">
          <img style="width: 100%" :src="project.imageUrl" alt="image" />
        </div>

        <div class="section-next-project pt-5 row col-md-10 col-lg-8 m-auto">
          <div class="col-6 text-left p-0">
            <router-link :to="{name: 'projects'}">
              <span class="back-to-work">Back to projects</span>
            </router-link>
          </div>
          <div class="col-6 next-project text-right p-0">
            <p>Next Project</p>
            <h1 @click="goToNextProject(nextProject.id)">{{ nextProject.title}}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "work-detail",
  computed: {
    allProjects() {
      return this.$store.getters.allProjects;
    },
    project() {
      let id = parseInt(this.$route.params.id);
      return this.$store.getters.oneProject(id);
    },
    nextProject() {
      let currentProjectIndex = this.allProjects.indexOf(this.project);
      let nextProjectIndex;
      if (currentProjectIndex == this.allProjects.length - 1)
        nextProjectIndex = 0;
      else nextProjectIndex = currentProjectIndex + 1;
      return this.allProjects[nextProjectIndex];
    }
  },
  methods: {
    moveBackground(e) {
      const background = document.querySelector(".hero-background-image");

      const backgroundWidth = background.getBoundingClientRect().width;
      const backgroundHeight = background.getBoundingClientRect().height;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      let dx = backgroundWidth / 2 - mouseX;
      let dy = backgroundHeight / 2 - mouseY;
      gsap.to(background, {
        x: dx * 0.04,
        y: dy * 0.04,
        scale: 1.05,
        duration: 1.5
      });
    },
    goToNextProject(id) {
      gsap.to(".project-container", { opacity: 0, duration: 1 });
      setTimeout(() => {
        this.$router.push(`/projects/${id}`);
      }, 1000);
    }
  },
  created() {
    console.log("created");
  },
  mounted() {
    let subtitle = document.querySelector(".subtitle");
    let title = document.querySelector(".title");
    if (this.$route.params.animateTitle) {
      gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 1 });
      gsap.from(subtitle, {
        y: 500,
        duration: 1.5
      });
    } else {
      gsap.from(subtitle, {
        y: 500,
        duration: 1.5
      });
    }

    console.log("mounted");
  },
  watch: {
    // if user naviagate to next p
    project() {
      gsap.fromTo(
        ".project-container",
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, duration: 1 }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/setting.less";
#project-detail {
  width: 100%;
  background: @background-color;
  .section-hero {
    width: 100%;
    height: 100vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;

    .hero-background {
      width: 100%;
      height: 100vh;
      z-index: 0;
      position: fixed;
      margin: 0 auto;
      left: 0;
      top: 0;
      right: 0;
      -webkit-transition: filter 0.6s ease-in-out;
      transition: filter 0.6s ease-in-out;
      overflow: hidden;

      .overlay {
        position: absolute;
        z-index: 1;
        background: black;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        pointer-events: none;
      }
      .hero-background-image {
        background-size: cover;
        position: absolute;
        background-position: center center;
        width: 100%;
        height: 100%;
        z-index: 0;
        opacity: 1;
        perspective: 1000px;
        overflow: visible;
      }
    }
    .project-title {
      position: absolute;
      z-index: 3;
      top: calc(50vh - 200px);
      left: 8rem;
      padding: 0;
      margin-top: 100px;

      color: white;

      overflow: hidden;
      pointer-events: none;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        text-transform: capitalize;
        font-size: 60px;
      }

      .subtitle {
        text-transform: capitalize;
        font-size: 1rem;
      }

      @media @mobile {
        left: 1rem;
        top: calc(50vh - 100px);
        margin-top: 60px;
        .title {
          font-size: 30px;
          line-height: 60px;
        }
      }
      @media @tablet {
        left: 2rem;
        top: calc(50vh - 140px);
        margin-top: 100px;
        .title {
          font-size: 50px;
          line-height: 100px;
        }
      }

      @media @large-desktop {
        left: 12vw;
        top: calc(50vh - 300px);
        margin-top: 200px;
        .title {
          font-size: 100px;
          line-height: 200px;
        }
      }
    }
    .scroll-down {
      position: absolute;
      z-index: 1;
      bottom: 5rem;
      left: 8rem;
      font-size: 1rem;
      color: white;
      @media @mobile {
        left: 1rem;
      }
      @media @tablet {
        left: 2rem;
      }
      @media @large-desktop {
        left: 12vw;
      }
    }
  }
  .section-content {
    width: 100%;
    position: relative;
    z-index: 4;
    background: @background-color;
    color: @text-color;
    text-align: center;
    padding: 5rem 0;
    h4 {
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 400;
    }
    p {
      font-weight: 300;
    }

    .back-to-work {
      text-transform: uppercase;
      color: @text-color;
    }
    .next-project {
      p {
        text-transform: uppercase;
      }
      h1 {
        text-transform: uppercase;
        cursor: pointer;
      }
    }
  }
}
</style>