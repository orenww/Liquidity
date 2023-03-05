import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    searchValue: "",
    items: {},
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
    setSearchValue(state, value) {
      state.searchValue = value;
    },

    setSearchItems(state, value) {
      state.categories[value.key].searchItems = value.items;
    },

    setItems(state, value) {
      state.categories[value.category].items = value.items;
    }
  },
  actions: {
    setSearchValue(context, value) {
      context.commit("setSearchValue", value);
      if (value && value != "") {
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

    async getCategoryItems(context, category) {
      try {
        const response = await axios.get(
          context.state.categories[category].url
        );
        context.commit("setItems", { category, items: response.data.results });
      } catch (error) {
        throw new Error("Failed to fetch!");
      }
    },    

    sort(context, params) {
      let items = this.getters.items(params.category);

      if (items.length > 0) {
        if (params.type === "number") {
          if (params.sort === "asc") {
            items.sort(function (a, b) {
              if (+a[params.order] > +b[params.order]) return 1;
              if (+a[params.order] < +b[params.order]) return -1;
              return 0;
            });
          } else {
            items.sort(function (a, b) {
              if (+b[params.order] > +a[params.order]) return 1;
              if (+b[params.order] < +a[params.order]) return -1;
              return 0;
            });
          }
        } else if (params.sort === "asc") {
          items.sort(function (a, b) {
            if (a[params.order] > b[params.order]) return 1;
            if (a[params.order] < b[params.order]) return -1;
            return 0;
          });
        } else {
          items.sort(function (a, b) {
            if (b[params.order] > a[params.order]) return 1;
            if (b[params.order] < a[params.order]) return -1;
            return 0;
          });
        }
        context.commit("setItems", {
          category: params.category,
          items,
        });
      }
    },

    delete(context, params) {
      let items = context.state.categories[params.category].items;
      var filtered = items.filter((item) => {
        return item.name != params.row.name;
      });

      context.commit("setItems", {
        category: params.category,
        items: filtered,
      });
    },

    update(context, params) {
      let items = context.state.categories[params.category].items;
      items[items.findIndex((item) => item.name === params.row.name)] =
        params.row;
      context.commit("setItems", {
        category: params.category,
        items: items,
      });
    },

    add(context, params) {
      let items = context.state.categories[params.category].items;
      items.push(params.row);
      context.commit("setItems", {
        category: params.category,
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
