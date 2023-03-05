<!-- eslint-disable no-unused-vars -->
<template>
  <div class="category">
    <div class="title">{{ category }}</div>
    <list-table :category="category" v-if="category === 'people'"></list-table>
  </div>
</template>

<script>
import ListTable from './../components/ListTable.vue';
export default {
  props: ["category"],
  name: "CategoryPage",
  data() {
    return {
      
    }
  },
  computed: {},
  methods: {},
  components: {ListTable},
  created() {},
};
</script>

<style lang="scss">
.category {
  width: 100%;

  .title {
    text-align: left;
    margin: 10px;
    font-weight: bold;
    font-size: x-large;
  }
}
</style>
