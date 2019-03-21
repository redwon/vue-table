<template>
  <div id="app" class="app">
    <h2>Vue Table</h2>
    <section class="section">
      <VueTable
        :fields="tableFields"
        :tableData="tableData"
      />
    </section>
  </div>
</template>

<script>
import provider from './providers/tableDataProvider';
import VueTable from './components/VueTable.vue';

export default {
    name: 'app',
    components: {
        VueTable
    },
    data() {
      return {
        tableFields: null,
        tableData: null
      }
    },
    mounted() {
      const data = provider.getData();
      this.tableFields = data.titles;
      this.tableData = data.items;
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
    max-width: 1070px;
    margin: 0 auto;
    padding: 15px;
  }
</style>
