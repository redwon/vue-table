<template>
  <div id="app" class="app">
    <h2>Vue Table</h2>
    <section class="section">
      <VueTable
        :fields="tableFields"
        :tableData="paginatedItems"
      />
      <VueTablePaginate
        :items="tableData"
        @paginatedItems="onPaginatedItems"
      />
    </section>
  </div>
</template>

<script>
import provider from './providers/tableDataProvider';
import VueTable from './components/VueTable.vue';
import VueTablePaginate from './components/VueTablePaginate.vue';

export default {
    name: 'app',
    components: {
        VueTable,
        VueTablePaginate
    },
    data() {
      return {
        tableFields: null,
        tableData: null,
        paginatedItems: null
      }
    },
    mounted() {
      const { titles, items } = provider.getData();
      this.tableFields = titles;
      this.tableData = items;
    },
    methods: {
      onPaginatedItems(items) {
        this.paginatedItems = items;
      }
    }
};
</script>

<style lang="scss">
  body {
    background-color: #f1f1f1;
  }

  .section {
    background-color: #fff;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .app {
    max-width: 1170px;
    margin: 0 auto;
    padding: 15px;
  }
</style>
