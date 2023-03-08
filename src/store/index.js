import { createStore } from "vuex";
import axios from "axios";
import PeopleModule from "./modules/people.js";
import PlanetsModule from "./modules/planets.js";
import FilmModule from "./modules/films.js";
import SpeciesModule from "./modules/species.js";
import VechiclesModule from "./modules/vehicles.js";
import StarshipsModule from "./modules/starships.js";

export default createStore({
  modules: {
    people: PeopleModule,
    planets: PlanetsModule,
    films: FilmModule,
    species: SpeciesModule,
    vehicles: VechiclesModule,
    starships: StarshipsModule,
  },
  state: {
    searchValue: "",
    isLoading:false,
    categories: {
      people: {
        key: "people",
        url: "https://swapi.dev/api/people/",        
        searchItems: [],
        displayProp: "name"        
      },
      planets: {
        key: "planets",
        url: "https://swapi.dev/api/planets/",
        searchItems: [],
        displayProp: "name"        
      },
      films: {
        key: "films",
        url: "https://swapi.dev/api/films/",
        searchItems: [],
        displayProp: "title",
      },
      species: {
        key: "species",
        url: "https://swapi.dev/api/species/",
        searchItems: [],
        displayProp: "name",        
      },
      vehicles: {
        key: "vehicles",
        url: "https://swapi.dev/api/vehicles/",
        searchItems: [],
        displayProp: "name",        
      },
      starships: {
        key: "starships",
        url: "https://swapi.dev/api/starships/",
        searchItems: [],
        displayProp: "name",
      },
    },
  },
  getters: {
    isLoading(state) {
      return state.categories.isLoading;
    },
  },
  mutations: {
    setSearchValue(state, payload) {
      state.searchValue = payload;
    },

    setSearchItems(state, payload) {
      state.categories[payload.key].searchItems = payload.items;
    },
  },
  actions: {
    setSearchValue(context, payload) {
      context.commit("setSearchValue", payload);
      if (payload && payload != "") {
        this.dispatch("searchAllCategories");
      } else {
        this.dispatch("clearAllItems");
      }
    },

    searchAllCategories(context) {
      context.state.isLoading = true;
      for (const key in context.state.categories) {
        axios
          .get(
            context.state.categories[key].url +
              "?search=" +
              context.state.searchValue
          )
          .then((response) => {
            var filtered = response.data.results.slice(0, 3);
            context.commit("setSearchItems", { key, items: filtered });
            context.state.isLoading = false;
          })
          .catch((error) => {
            console.log(error);
            context.state.isLoading = false;
          });
      }
    },

    clearAllItems(context) {
      for (const key in context.state.categories) {
        context.commit("setSearchItems", { key, items: [] });
      }
    },
  },
});
