<template>
  <div class="search">
    <div class="custom-wrapper">
      <v-icon icon="mdi-magnify" class="input-icon"></v-icon>      
      <input
        class="input-field"
        type="text"
        placeholder="Search ..."
        :value="searchValue"
        @input="debounceSearch"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  data() {
    return {};
  },
  computed: mapState(["searchValue", ""]),

  methods: {
    debounceSearch(event) {
      this.searchValue = "";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$store.dispatch("setSearchValue", event.target.value);
      }, 200);
    }
  },
};
</script>

<style lang="scss">
.search {
  .input-icon {
    position: absolute;
    color: rgb(0, 128, 255);

    /* Vertically center the icon in the input */
    top: calc(45% - 0.5em);
    padding-left: 10px !important;
  }

  .input-field {
    padding-left: 25px;
    width: 49%;
    margin: 2px;
    border-radius: 25px;
    font-size: 18px;
    height: 40px;
    background-color: transparent;
    border-style: solid;
  }
  .custom-wrapper {
    position: relative;
  }
}
</style>
