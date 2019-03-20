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
      <template v-for="(item, itemIndex) in tableData">
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
import provider from '../providers/tableDataProvider';

export default {
    name: 'vue-table',
    data() {
      return {
          fields: null,
          tableData: null,
          sortBy: {
            field: null
          }
      };
    },
    mounted() {
      const data = provider.getData();
      this.fields = data.titles;
      this.tableData = data.items;
    },
    methods: {
      orderBy(key) {
        this.sortBy.field = key;
        this.tableData.sort(this.compare);
      },
      compare(item1, item2) {
        const key = this.sortBy.field;
        if (item1[key] < item2[key])
          return -1;
        if (item1[key] > item2[key])
          return 1;
        return 0;
      }
    }
};
</script>
