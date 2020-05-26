import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  projects: [
      { id: 1,
        title: "sneaker",
        subtitle: "branding",
        imageUrl:
          "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?cs=srgb&dl=flight-landscape-nature-sky-36717.jpg&fm=jpg"
      },
      { id:2,
        title: "everest",
        subtitle: "design",
        imageUrl:
          "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      { id: 3,
        title: "red room",
        subtitle: "photography",
        imageUrl:
          "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      { id: 4,
        title: "forest",
        subtitle: "branding",
        imageUrl:
          "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      { id: 5,
        title: "mountain",
        subtitle: "photography",
        imageUrl:
          "https://images.pexels.com/photos/314860/pexels-photo-314860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      }
  ]

}

const getters = {
  allProjects: (state) => {
    return state.projects
  },
  oneProject: (state) => (id) => {
    return state.projects.find(project => project.id === id)
  }
}

const mutations = {

}

const actions = {

}



export default new Vuex.Store({
  state, getters, mutations, actions
})
