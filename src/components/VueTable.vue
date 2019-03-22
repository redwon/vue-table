<template>
  <div class="table-container">
    <div class="table-search">
      <input
        class="form-control"
        type="text"
        placeholder="Search..."
        @input="filterBy"
      >
    </div>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th class="table-head">#</th>
          <template v-for="(field, fieldKey) in fields">
            <th
              class="table-head"
              :class="{ 'table-head-active': sortBy.field === fieldKey }"
              :key="fieldKey"
              @click="orderBy(fieldKey)"
            >
              {{ field }}
              <span class="table-head-sort-icons">
                <i
                  class="icon fas fa-caret-up"
                  :class="{ 'sort-icon-active': sortBy.field === fieldKey && sortBy.order === 'asc' }"
                ></i>
                <i
                  class="icon fas fa-caret-down"
                  :class="{ 'sort-icon-active': sortBy.field === fieldKey && sortBy.order === 'desc' }"
                ></i>
              </span>
            </th>
          </template>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, itemIndex) in items">
          <tr
            class="table-row"
            :key="itemIndex">
            <td class="table-col">{{ itemIndex + 1 }}</td>
            <template v-for="(field, fieldKey) in fields">
              <td 
                class="table-col"
                :key="fieldKey"
              >
                <template v-if="item !== editItem">
                  {{ item[fieldKey] }}
                </template>
                <template v-else>
                  <input
                    class="table-input"
                    type="text"
                    v-model="item[fieldKey]"
                  >
                </template>
              </td>
            </template>
            <td class="text-center">
              <template v-if="item !== editItem">
                <i
                  class="fas fa-edit"
                  @click="editCol(item)"
                ></i>
              </template>
              <template v-else>
                <i
                  class="fas fa-check"
                  @click="editDone"
                ></i>
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name: 'vue-table',
    data() {
      return {
          items: () => [],
          sortBy: {
            field: null,
            order: 'asc'
          },
          editItem: null
      };
    },
    props: {
      fields: Object,
      tableData: Array
    },
    mounted() {
      this.processData(this.tableData);
    },
    methods: {
      processData(data) {
        this.resetOrder();
        if(data) {
          this.items = data.slice();
        } else {
          this.items = [];
        }
      },
      orderBy(key) {
        this.editDone();
        if (this.sortBy.field === key) {
          this.toggleOrder();
        } else {
          this.sortBy.field = key;
          this.sortBy.order = 'asc';
          this.items.sort(this.compare);
        }
      },
      toggleOrder() {
        this.items.reverse();
        this.sortBy.order = this.sortBy.order === 'asc' ? 'desc' : 'asc';
      },
      resetOrder() {
        this.sortBy.field = null;
        this.sortBy.order = 'asc';
      },
      compare(item1, item2) {
        const key = this.sortBy.field;

        if (isNaN(item1[key])) {
          if (isNaN(item2[key])) { // item1 and item2 are strings
            return item1[key].localeCompare(item2[key]);
          } else {                 // item1 string and item2 number
            return 1;              // item1 > item2
          }
        } else {
          if (isNaN(item2[key])) { // item1 number and item2 string
            return -1;             // item1 < item2
          } else {                 // item1 and item2 are numbers
            return parseFloat(item1[key]) - parseFloat(item2[key]);
          }
        }
      },
      filterBy(event) {
        this.resetOrder();
        this.editDone();
        let val = event.target.value.toLowerCase();
        this.items = this.tableData.filter(i => {
          for (let field in this.fields) {
            let fieldVal = i[field].toLowerCase();
            if(fieldVal.indexOf(val) !== -1) {
              return true;
            }
          }
          return false;
        });
      },
      editCol(item) {
        this.editItem = item;
      },
      editDone() {
        this.editItem = null;
      }
    },
    watch: {
      tableData(val) {
        this.processData(val);
      }
    }
};
</script>

<style lang="scss">
  .table-head {
    cursor: pointer;
  }
  
  .table th.table-head-active {
    background-color: #454d55;
  }

  .table-head-sort-icons {
    .icon {
      font-size: 14px;
      color: #7a7a7a;
    }

    .sort-icon-active {
      color: #fff;
    }
  }

  .table-search {
    max-width: 300px;
    padding-bottom: 15px;
  }

  .table-input {
    max-width: 100px;
  }
</style>