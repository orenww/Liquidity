<!-- eslint-disable no-unused-vars -->
<template>
  <base-dialog
    :show="editMode.showDialog"
    title="Edit"
    @close="editMode.showDialog = false"
  >
    <template #default>
      <edit-form :data="selectedRow" @save-data="saveData"></edit-form>
    </template>
  </base-dialog>

  <div class="list">
    <table-lite
      :has-checkbox="false"
      :is-loading="table.isLoading"
      :is-re-search="table.isReSearch"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      :is-hide-paging="true"
      @do-search="doSearch"
      @is-finished="tableLoadingFinish"
      @row-clicked="rowClicked"
    />

    <button v-if="!table.isLoading" class="btn btn-add" @click="addItem()">
      Add
    </button>
  </div>

</template>

<script>
// import { mapState } from "vuex";
import { reactive } from "vue";

// eslint-disable-next-line no-unused-vars
import TableLite from "vue3-table-lite";
import EditForm from "../components/EditForm.vue";

export default {
  props: ["category"],
  name: "ListTable-1",
  data() {
    return {
      editMode: reactive({ showDialog: false }),
      selectedRow: reactive({ data: {} }),
      btnTypeClicked: "",
      table: {
        columns: [
          {
            label: "NAME",
            field: "name",
            width: "30%",
            sortable: true,
            isKey: true,
            type: "string",
          },
          {
            label: "GENDER",
            field: "gender",
            width: "10%",
            sortable: true,
            type: "string",
          },
          {
            label: "BIRTH YEAR",
            field: "birth_year",
            width: "10%",
            sortable: false,
            type: "string",
          },
          {
            label: "HEIGHT",
            field: "height",
            width: "10%",
            sortable: true,
            type: "number",
          },
          {
            label: "MASS",
            field: "mass",
            width: "10%",
            sortable: true,
            type: "number",
          },
          {
            label: "ACTIONS",
            field: "quick",
            width: "20%",
            display: function (row) {
              return (
                '<div class="btn-container"><button type="button" data-id="' +
                row.id +
                '" class="is-rows-el btn btn-edit">Edit</button>' +
                '<button type="button" data-id="' +
                row.id +
                '" class="is-rows-el btn btn-delete">Delete</button></div>'
              );
            },
          },
        ],
        rows: [],
        totalRecordCount: 0,
        sortable: {
          order: "name",
          sort: "asc",
        },
      },
    };
  },
  // computed: mapState(["selectedCategory", "categories", "items"]),
  computed: {
    items() {
      return this.$store.getters.items(this.category);
    },
  },
  methods: {
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
    doSearch(offset, limit, order, sort) {
      let type = "string";
      if (this.table && this.table.columns) {
        type = this.table.columns.find((col) => col.field === order).type;
      }

      this.$store.dispatch("sort", {
        order,
        sort,
        type,
        category: this.category,
      });

      this.table.rows = this.items;
      this.table.sortable.order = order;
      this.table.sortable.sort = sort;
    },

    tableLoadingFinish(elements) {
      const updateBtnTypeClicked = (value) => {
        this.btnTypeClicked = value;
      };
      this.table.isLoading = false;
      Array.prototype.forEach.call(elements, (element) => {
        if (element.classList.contains("btn-edit")) {
          element.addEventListener("click", function () {
            updateBtnTypeClicked("edit");
          });
        }
        if (element.classList.contains("btn-delete")) {
          element.addEventListener("click", function () {
            updateBtnTypeClicked("delete");
          });
        }
      });
    },
    async rowClicked(row) {
      if (this.btnTypeClicked === "edit") {
        this.onEdit(row);
        this.editMode.showDialog = true;
      } else {
        await this.$store.dispatch("delete", {
          category: this.category,
          row: row,
        });
        this.table.rows = this.items;
      }
    },
    onEdit(row) {
      console.log("row - ", row);
      this.selectedRow.isNew = false;
      this.selectedRow.data = row;
    },

    confirmEdit() {
      console.log("confirmEdit");
      this.editMode.showDialog = false;
    },
    async loadData() {
      try {
        this.table.isLoading = true;
        await this.$store.dispatch("getCategoryItems", this.category);
        return true;
      } catch (error) {
        console.log(error);
        this.error = error.message || "Something went wrong!";
        return false;
      }
    },
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { TableLite, EditForm },
  created() {
    if (this.items.length === 0) {
      this.loadData().then(() => {
        this.doSearch(0, 10, "name", "asc");
      });
    } else {
      this.doSearch(0, 10, "name", "asc");
    }
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

.vtl-tbody-tr {
  &:hover {
    .btn-container {
      display: flex;
    }
  }

  .btn-container {
    display: none;
    margin-left: 10%;
    margin-right: 10%;

    .btn{
      width: 50%;
    }
  }
}

.list {
  width: 100%;

  .btn-add {
    width: 80px;
    margin-top: 10px;
  }
}
</style>
