<template>
  <div class="navbar-container">
    <!-- Navbar start -->
    <div id="nav-bar" class="nav-bar">
      <div class="row d-flex align-items-center">
        <div class="col-6" id="my-logo">
          <router-link to="/" class="logo-wrapper">
          <svg id="danny-logo" viewBox="0 0 275.75 165.82">
          <polygon points="247.49 0.05 275.75 0.05 275.75 165.82 137.4 41.39 137.4 0.05 247.91 100.02 247.49 0.05" fill="#fff"/>
          <rect x="137.77" y="140.89" width="27.79" height="24.93" fill="#fff"/>
          <path d="M179.18,79.77A66.44,66.44,0,0,0,162.57,54.9a69.72,69.72,0,0,0-25.89-15,107,107,0,0,0-33.7-5H47.22V159.15l28.85-23.63-.2-72,30.57,0c14.39,0,50.93,9,52.76,50.05,2.19,49.42-53,61.46-53,61.46l-30.24,0-28.46,25.6H96.78a109.41,109.41,0,0,0,34.2-5.26,78.71,78.71,0,0,0,28.13-15.93,74.47,74.47,0,0,0,18.95-26.84q6.93-16.19,6.94-38.3Q185,94.64,179.18,79.77Z" transform="translate(-47.22 -34.89)" fill="#fff"/></svg>
          </router-link>
        </div>

        <div class="col-6 text-right btn-menu">
          <span
            @click="toggleMenu"
            class="hamburger-caption magnetic-button hoverable"
          >{{hamburgerCaption}}</span>
          <button
            id="hamburger-icon"
            class="hamburger-icon magnetic-button hoverable"
            @click="toggleMenu" >
            <div class="hamburger-el"></div>
            <div class="hamburger-el"></div>
          </button>
        </div>
      </div>
    </div>
    <!-- Navbar end -->

    <!-- Menu Start -->
    <div id="menu-wrapper" class="menu-wrapper">
      <div class="menu-background">
        <!-- <vue-particles color="#dedede"></vue-particles> -->
      </div>
      <div class="menu-container row">
        <div class="menu-list col-xs-12 col-sm-12 col-md-8">
          <ul>
            <li>
              <router-link class="menu-item" :to="{name:'home'}" exact="">Home.</router-link>
            </li>
            <li>
              <router-link class="menu-item" :to="{name:'about'}">About.</router-link>
            <li>
            <li>
              <router-link class="menu-item" :to="{name:'projects'}">Projects.</router-link>
            <li>
              <router-link class="menu-item" :to="{name:'contact'}">Contact.</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Menu end  -->
  </div>
</template>

<script>

import gsap from "gsap";
export default {
  name: "nav-bar",
  data() {
    return {
      hamburgerCaption: "Menu",
      showMenu: false,
      tl: gsap.timeline({ paused: true })
    };
  },
  methods: {
    toggleMenu() {
      const hamburger = document.querySelector("#hamburger-icon");
      if (this.showMenu == false) {
        this.hamburgerCaption = "Close";
        hamburger.classList.add("close-menu");
        this.tl.play();
        this.showMenu = true;
      } else {
        this.hamburgerCaption = "Menu";
        hamburger.classList.remove("close-menu");
        this.tl.reverse();
        this.showMenu = false;
      }
    }
  },
  mounted() {
    const navMenu = document.querySelector("#menu-wrapper");
    const menuBackground= document.querySelector('.menu-background');
    const menuItems = document.querySelectorAll(".menu-item");
    const moreInfo = document.querySelector(".more-info")

//  set menu items position
    this.tl.set(menuItems, { 
      x: -40,
      opacity: 0
    });

    this.tl.set(moreInfo, { 
      x: 100,
      opacity: 0
    });

    this.tl.to(navMenu, {
      height: "100vh",
      opacity: 1,
      ease: "power2.out",
      duration: 0.5
    });

    this.tl.to(menuBackground, {
      height: '100vh',
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })

    this.tl.to(menuItems, {
      opacity: 1,
      x: 0,
      ease: "power2.out",
      duration: 0.5,
      stagger: 0.2
    });
    
    this.tl.to(moreInfo, {
      opacity: 1,
      x: 0,
      ease: "power2.out",
      duration: 0.5,
    });

    navMenu.addEventListener("click", () => {
      this.toggleMenu();
    });
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/setting.less";

// navbar styling
.nav-bar {
  // padding: 1rem 2rem;
  width: 100%;
  color: white;
  mix-blend-mode: difference;
  background: transparent;
  position: fixed;
  top: 5rem;
  left: 0;
  z-index: 999;
  @media @mobile {
    top: 2rem;
  }
}

.btn-menu {
  position: relative;
  top: 0;
  color: white;
  right: 5rem;
  cursor: pointer;
  border: none;
  outline: none;
  @media @mobile {
    right: 1.5rem;
  }
  .hamburger-icon {
    background: none;
    border: none;
    margin-top: 3px;
    outline: none;
    @media @mobile, @tablet {
      -o-transform: none !important;
      -moz-transform: none !important;
      -ms-transform: none !important;
      -webkit-transform: none !important;
      transform: none !important;
    }
    .hamburger-el {
      content: "";
      background: white;
      margin: 5px;
      display: block;
      width: 25px;
      height: 2px;
      transition: 0.3s ease;

      &:nth-child(2) {
        animation: menuIcon 5s ease 2s infinite;
        @keyframes menuIcon {
          30% {
            transform: scaleX(0.4);
            transform-origin: left center;
          }
          40% {
            transform-origin: right center;
          }
          60%,
          80% {
            transform: scaleX(1);
            transform-origin: right center;
          }
        }
      }
    }
  }

  .hamburger-icon.close-menu {
    .hamburger-el {
      transition: 0.3s ease;
      &:nth-child(1) {
        transform: rotate(45deg) translate(0px, 5px);
        animation: none;
      }
      &:nth-child(2) {
        transform: rotate(-45deg) translate(0px, -5px);
        animation: none;
      }
    }
  }
  .hamburger-caption {
    position: absolute;
    margin-left: -3rem;
    transition: 0.5s;
    color: white;
    @media @mobile {
      display: none;
    }
    @media @tablet {
      transform: none !important;
    }
  }
}

.logo-wrapper {
  #danny-logo {
    margin-top:-10px;
    width: 2.5rem;
    fill:white;
    margin-left: 5rem;
    @media @mobile{
      width: 2rem;
      margin-left: 1.5rem;
    }
    }
}


// end navbar styling

// menu styling

.menu-wrapper {
  width: 100%;
  height: 0;
  position: fixed;
  left: 0;
  padding: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  background: @text-color;;
  overflow: hidden;
  .menu-background{
    width: 100%;
    height: 0;
    opacity: 1;
    position: absolute;
    z-index: -1;
    background: @text-color;
  }
  .menu-container {
    position: relative;
    width: 90%;
    margin: auto auto;
    height: fit-content;
    z-index: 1;
    padding: 1rem;
    // display: flex;
    // align-items: center;
    @media @tablet {
        width: 100%;
      }
       @media @large-desktop {
        width: 70%;
      }
    .menu-list ul li {
      margin-top: 2.5rem;
      display: block;
      @media @mobile{
        text-align: center;
        margin: 2rem 0;
      }
      
      a {
        margin: 0;
        color: grey;
        width: fit-content;
        left: 10rem;
        font-weight: 400;
        text-transform: capitalize;
        position: relative;
        font-size: 60px;
        line-height: 3.5rem;
        padding: 0.5rem;
        display: inline-block;
        transition: color 0.5s;
        @media @mobile {
          left: 0rem;
          font-size: 2.5rem;
          line-height: 3rem;
        }
        @media @tablet {
          left: 7rem;
          font-size: 3rem;
          line-height: 3rem;
        }
        &:hover {
          background: none;
          color: white
        }
      }
    }
    .menu-list ul li a.router-link-active {
      color: white
    }


  }
}


</style>