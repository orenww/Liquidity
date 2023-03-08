<template>
  <base-dialog
    :show="showDialog"
    :title="dialgTitle"
    @close="closeDialog()"
  >
    <template #default>
      <edit-form :data="selectedRow" @save-data="saveData" />
    </template>
  </base-dialog>

  <div class="list">
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="desserts"
      item-value="name"
      class="elevation-1"
    >
      <template #[`item.actions`]="{ item }">
        <div class="btn-container">
          <button class="btn btn-edit" @click="editItem(item.raw)">Edit</button>
          <button class="btn btn-edit" @click="deleteItem(item.raw)">
            Delete
          </button>
        </div>
      </template>
      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="numOfPages"
            :total-visible="1"
            @click="loadPage($event)"
          />
        </div>
      </template>
    </v-data-table>

    <button class="btn btn-add" @click="addItem()">Add</button>
  </div>
</template>

<script>
import EditForm from "../components/EditForm.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";

export default {
  name: "VeutifyTable",
  components: { EditForm },

  // eslint-disable-next-line vue/require-prop-types
  props: ["category", "headers"],
  data() {
    return {
      options: {
        pageCount: 1,
      },
      page: 1,
      itemsPerPage: 10,
      numOfPages: 1,
      desserts: [],
      dialgTitle: "",
      showDialog: false,
      selectedRow: { data: {} },
    };
  },

  computed: {
    items() {
      return this.$store.getters[this.category + "/items"];
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    count() {
      return this.$store.getters[[this.category + "/count"]];
    },
  },
  created() {
    if (this.items.length === 0) {
      this.loadData().then(() => {
        this.desserts = this.items;
        this.numOfPages = Math.ceil(this.count / this.itemsPerPage);
      });
    } else {
      this.desserts = this.items;
      this.numOfPages = Math.ceil(this.count / this.itemsPerPage);
    }
  },
  methods: {
    saveData(data) {
      if (data.isNew) {
        delete data.isNew;
        this.$store.dispatch(this.category + "/add", {
          row: data,
        });
      } else {
        this.$store.dispatch(this.category + "/update", {
          row: data,
        });
      }
      this.closeDialog();
    },

    closeDialog() {
      this.showDialog = false;
      this.selectedRow.isNew = false;
      this.selectedRow.data = {};
    },

    addItem() {
      this.showDialog = true;
      this.selectedRow.isNew = true;
      this.dialgTitle = "Add";
    },

    editItem(row) {
      console.log("row - ", row);
      this.showDialog = true;
      this.selectedRow.isNew = false;
      this.selectedRow.data = row;
      this.dialgTitle = "Edit";
    },

    async deleteItem(row) {
      console.log("row - ", row);
      await this.$store.dispatch(this.category + "/delete", {
        category: this.category,
        row: row,
      });
      this.desserts = this.items;
    },

    async loadPage(event) {
      if (event.target.innerHTML === "1") {
        return;
      }
      await this.$store
        .dispatch(this.category + "/getItems", {
          category: this.category,
          page: this.page,
        })
        .then(() => {
          this.desserts = this.items;
        });
    },

    async loadData() {
      try {
        await this.$store.dispatch(this.category + "/getItems", {
          category: this.category,
          page: 1,
        });
        return true;
      } catch (error) {
        console.log(error);
        this.error = error.message || "Something went wrong!";
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.btn {
  margin: 0 5px 0 0;
  padding: 4px 8px;
  background: #9d98b5;
  color: #fff;
  text-decoration: none;
  text-align: center;
  display: inline;
}

.list {
  width: 100%;
  padding: 15px;
  .v-data-table-header__content {
    justify-content: center;
  }

  .v-data-table__tr {
    &:hover {
      .btn-container {
        display: flex;
      }
    }

    .btn-container {
      display: none;
      margin-left: 10%;
      margin-right: 10%;

      .btn {
        width: 50%;
      }
    }
  }

  .btn-add {
    width: 80px;
    margin-top: 10px;
  }

  td {
    text-align: center !important;
  }
}
</style>
