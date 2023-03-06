<template>
  <div v-if="!isLoading " class="content" :class="{ data: searchValue != '' && !isDataEmpty }">
    <div v-if="searchValue">
      <div class="category" v-for="category in categories" :key="category.key">
        <div v-if="category.searchItems.length > 0">
          <div class="category-title">
            <div class="text">{{ category.key }}</div>
          </div>
          <div v-for="item of category.searchItems" :key="item" class="item">
            <div
              class="text"
              v-html="highlight(item[category.displayProp])"
            ></div>
          </div>
          <button class="btn btn-view" @click="viewAll(category.key)">
            View all
          </button>
        </div>
      </div>
    </div>
  </div>
  <h4 v-if="isLoading">Loading...</h4>
  <h4 v-if="searchValue != '' && isDataEmpty && !isLoading">No data found</h4>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Content-1",
  data() {
    return {};
  },  
  computed: {
    ...mapState(["categories", "items", "searchValue", "isLoading"]),
    isDataEmpty(){
      for (const key in this.categories) {
        if(this.categories[key].searchItems.length > 0){
          return false;
        }
      }
      return true;
    }
  },

  methods: {
    viewAll(category) {
      this.$router.push({
        name: "CategoryPage",
        params: { category: category },
      });
    },
    highlight(content) {
      if (!this.searchValue) {
        return this.content;
      }
      return content.replace(new RegExp(this.searchValue, "gi"), (match) => {
        return '<span class="highlightText">' + match + "</span>";
      });
    },    
  },
};
</script>

<style lang="scss">
.content {
  margin-left: 24%;
  margin-right: 24%;
  text-align: left;

  &.data {
    border: 1px solid black;
  }

  .category-title {
    background-color: lightgray;
    text-align: left;
    padding-left: 10px;
    font-weight: bold;
  }

  .btn-view {
    margin: 20px;
  }

  .text {
    padding-left: 10px;
    padding: 3px;
  }

  .highlightText {
    background: yellow;
  }

  .btn {
    margin-left: 80%;
    margin-bottom: 3px;
  }
}
</style>
