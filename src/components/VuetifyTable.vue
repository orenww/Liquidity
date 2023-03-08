<template>
  <base-dialog
    :show="editMode.showDialog"
    title="Edit"
    @close="editMode.showDialog = false"
  >
    <template #default>
      <edit-form
        :data="selectedRow"
        @save-data="saveData"
      />
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
          <button
            class="btn btn-edit"
            @click="editItem(item.raw)"
          >
            Edit
          </button>
          <button
            class="btn btn-edit"
            @click="deleteItem(item.raw)"
          >
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

    <button
      class="btn btn-add"
      @click="addItem()"
    >
      Add
    </button>
  </div>
</template>

<script>
import { reactive } from "vue";
import EditForm from "../components/EditForm.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";

export default {
  name: "VeutifyTable",
  components: { EditForm },
  
  // eslint-disable-next-line vue/require-prop-types
  props: ["category"],
  data() {
    return {
      options: {
        pageCount: 1,
      },
      page: 1,
      itemsPerPage: 10,
      numOfPages: 1,
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
      desserts: [],

      editMode: reactive({ showDialog: false }),
      selectedRow: reactive({ data: {} }),
    };
  },

  computed: {
    items() {
      return this.$store.getters.items(this.category);
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    count() {
      return this.$store.getters.count(this.category);
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
    customSort(a, b) {
      if (isNaN(a) || isNaN(b)) {
        return a.toString() > b.toString() ? -1 : 1;
      }
      return a - b;
    },
    saveData(data) {
      console.log(data);
      if (data.isNew) {
        delete data.isNew;
        this.$store.dispatch("add", {
          category: this.category,
          row: data,
        });
      } else {
        this.$store.dispatch("update", {
          category: this.category,
          row: data,
        });
      }

      this.editMode.showDialog = false;
      this.selectedRow.isNew = false;
      this.selectedRow.data = {};
      this.btnTypeClicked = "";
    },

    addItem() {
      this.editMode.showDialog = true;
      this.selectedRow.isNew = true;
    },

    editItem(row) {
      console.log("row - ", row);
      this.editMode.showDialog = true;
      this.selectedRow.isNew = false;
      this.selectedRow.data = row;
    },

    async deleteItem(row) {
      console.log("row - ", row);
      await this.$store.dispatch("delete", {
        category: this.category,
        row: row,
      });
      this.desserts = this.items;
    },

    confirmEdit() {      
      this.editMode.showDialog = false;
    },

    async loadPage(event) {
      if (event.target.innerHTML === "1") {
        return;
      }
      await this.$store
        .dispatch("getCategoryItems", {
          category: this.category,
          page: this.page,
        })
        .then(() => {
          this.desserts = this.items;
        });
    },

    async loadData() {
      try {
        await this.$store.dispatch("getCategoryItems", {
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
