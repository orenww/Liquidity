import axios from "axios";

export default {
  namespaced: true,
  state: {
    url: "https://swapi.dev/api/people/",
    items: [],
    count: 0,
    isLoading:false
  },
  getters: {
    items(state) {
      return state.items;
    },

    url(state){
      return state.url;
    },

    count(state) {
      return state.count;
    },

    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload.items;
    },

    setCount(state, payload) {
      state.count = payload.count;
    },
  },
  actions: {
    async getItems(context, payload) {
      try {
        context.state.isLoading = true;
        let url = context.state.url + "?page=" + payload.page;
        const response = await axios.get(url);
        context.state.isLoading = false;
        context.commit("setItems", {
          items: response.data.results,
        });

        context.commit("setCount", {
          count: response.data.count,
        });
      } catch (error) {
        context.state.isLoading = false;
        throw new Error("Failed to fetch!");
      }
    },

    delete(context, payload) {
      let items = context.state.items;
      var filtered = items.filter((item) => {
        return item.name != payload.row.name;
      });

      context.commit("setItems", {
        items: filtered,
      });
    },

    update(context, payload) {
      let items = context.state.items;
      items[items.findIndex((item) => item.name === payload.row.name)] =
        payload.row;
      context.commit("setItems", {
        items: items,
      });
    },

    add(context, payload) {
      let items = context.state.items;
      items.push(payload.row);
      context.commit("setItems", {
        category: payload.category,
        items: items,
      });
    },
  },
};
