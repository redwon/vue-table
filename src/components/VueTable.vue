<template>
  <table class="table table-striped">
    <thead class="thead-dark">
      <tr>
        <th class="table-head">#</th>
        <template v-for="(field, fieldKey) in fields">
          <th
            class="table-head"
            :key="fieldKey"
            @click="orderBy(fieldKey)"
          >
            {{ field }}
          </th>
        </template>
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
              {{ item[fieldKey] }}
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
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
          }
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
        this.items = data.slice();
      },
      orderBy(key) {
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
      compare(item1, item2) {
        const key = this.sortBy.field;
        if (item1[key] < item2[key])
          return -1;
        if (item1[key] > item2[key])
          return 1;
        return 0;
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
</style>