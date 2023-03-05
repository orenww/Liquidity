<template>
  <div class="home">
    <div class="custom-wrapper">
      <i class="fa fa-eye input-icon">
        <font-awesome-icon icon="fa-solid fa-search" />
      </i>
      <input
        class="input-field"
        type="text"
        placeholder="Search product..."
        @input="debounceSearch"
      />
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Search-1",
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
.home {
  .input-icon {
    position: absolute;
    color: rgb(0, 128, 255);

    /* Vertically center the icon in the input */
    top: calc(50% - 0.5em);
    padding-left: 10px !important;
  }

  input {
    padding-left: 25px;
    width: 49%;
    margin: 2px;
    border-radius: 25px;
    font-size: 18px;
    height: 40px;
    background-color: transparent;
  }
  .custom-wrapper {
    position: relative;
  }
}
</style>
