<template>
  <div class="category">
    <div class="title">
      {{ category }}
    </div>   
    <vuetify-table
      v-if="category === 'people'"
      :category="category"
      :headers="headers"
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
      headers: [
        { title: "NAME", key: "name", width: "20%", align: "start" },
        { title: "GENDER", key: "gender", width: "10%" },
        {
          title: "BIRTH YEAR",
          key: "birth_year",
          width: "10%",
          sortable: false,
        },
        { title: "HEIGHT", key: "height", width: "10%" },
        { title: "MASS", key: "mass", width: "10%", sort: this.customSort },
        { title: "ACTIONS", key: "actions", sortable: false, width: "30%" },
      ],
    }
  },
  computed: {},
  created() {},
  methods: {
    customSort(a, b) {
      if (isNaN(a) || isNaN(b)) {
        return a.toString() > b.toString() ? -1 : 1;
      }
      return a - b;
    },
  },
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
