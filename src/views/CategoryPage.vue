<template>
  <div class="category">
    <div class="title">
      {{ category }}
    </div>
    <!-- <list-table :category="category" v-if="category === 'people'"></list-table> -->
    <vuetify-table
      v-if="category === 'people'"
      :category="category"
    />
  </div>
</template>

<script>
// import ListTable from './../components/ListTable.vue';
import VuetifyTable from './../components/VuetifyTable.vue';
export default {
  name: "CategoryPage",
  components: {VuetifyTable},
  props: ["category"],
  data() {
    return {
      
    }
  },
  computed: {},
  created() {},
  methods: {},
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
