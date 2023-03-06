import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    searchValue: "",
    categories: {
      people: {
        key: "people",
        url: "https://swapi.dev/api/people/",
        items: [],
        searchItems: [],
        displayProp: "name",
        count: 0,
      },
      planets: {
        key: "planets",
        url: "https://swapi.dev/api/planets/",
        items: [],
        searchItems: [],
        displayProp: "name",
        count: 0,
      },
      films: {
        key: "films",
        url: "https://swapi.dev/api/films/",
        items: [],
        searchItems: [],
        displayProp: "title",
        count: 0,
      },
      species: {
        key: "species",
        url: "https://swapi.dev/api/species/",
        items: [],
        searchItems: [],
        displayProp: "name",
        count: 0,
      },
      vehicles: {
        key: "vehicles",
        url: "https://swapi.dev/api/vehicles/",
        items: [],
        searchItems: [],
        displayProp: "name",
        count: 0,
      },
      starships: {
        key: "starships",
        url: "https://swapi.dev/api/starships/",
        items: [],
        searchItems: [],
        displayProp: "name",
        count: 0,
      },
    },
  },
  getters: {
    items: (state) => (category) => {
      return state.categories[category].items;
    }    
  },
  mutations: {
    setSearchValue(state, payload) {
      state.searchValue = payload;
    },

    setSearchItems(state, payload) {
      state.categories[payload.key].searchItems = payload.items;
    },

    setItems(state, payload) {
      state.categories[payload.category].items = payload.items;
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
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    clearAllItems(context) {
      for (const key in context.state.categories) {
        context.commit("setSearchItems", { key, items: [] });
      }
    },

    async getCategoryItems(context, payload) {
      try {
        const response = await axios.get(context.state.categories[payload].url);
        context.commit("setItems", {
          category: payload,
          items: response.data.results,
        });
      } catch (error) {
        throw new Error("Failed to fetch!");
      }
    },

    sort(context, payload) {
      let items = this.getters.items(payload.category);

      if (items.length > 0) {
        if (payload.type === "number") {
          if (payload.sort === "asc") {
            items.sort(function (a, b) {
              if (+a[payload.order] > +b[payload.order]) return 1;
              if (+a[payload.order] < +b[payload.order]) return -1;
              return 0;
            });
          } else {
            items.sort(function (a, b) {
              if (+b[payload.order] > +a[payload.order]) return 1;
              if (+b[payload.order] < +a[payload.order]) return -1;
              return 0;
            });
          }
        } else if (payload.sort === "asc") {
          items.sort(function (a, b) {
            if (a[payload.order] > b[payload.order]) return 1;
            if (a[payload.order] < b[payload.order]) return -1;
            return 0;
          });
        } else {
          items.sort(function (a, b) {
            if (b[payload.order] > a[payload.order]) return 1;
            if (b[payload.order] < a[payload.order]) return -1;
            return 0;
          });
        }
        context.commit("setItems", {
          category: payload.category,
          items,
        });
      }
    },

    delete(context, payload) {
      let items = context.state.categories[payload.category].items;
      var filtered = items.filter((item) => {
        return item.name != payload.row.name;
      });

      context.commit("setItems", {
        category: payload.category,
        items: filtered,
      });
    },

    update(context, payload) {
      let items = context.state.categories[payload.category].items;
      items[items.findIndex((item) => item.name === payload.row.name)] =
        payload.row;
      context.commit("setItems", {
        category: payload.category,
        items: items,
      });
    },

    add(context, payload) {
      let items = context.state.categories[payload.category].items;
      items.push(payload.row);
      context.commit("setItems", {
        category: payload.category,
        items: items,
      });
    },
  },
  modules: {},
});

// searchAllCategories(context) {
//   var promises = [];
//   var p;
//   var isError;
//   for (const key in urls) {
//     p = axios.get(urls[key]).catch((error) => {
//       console.log(error);
//       isError = true;
//     });
//     promises.push(p);
//   }

//   var promise = Promise.all(promises);

//   console.log(isError);

//   promise
//     .then((data) => {
//       context.commit("setItems", data);
//     })
//     .catch(function (error) {
//       console.error("error", error);
//     });
// },
