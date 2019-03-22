<template>
  <div class="table-paginate">
    <div class="table-paginate-count">
      <span v-if="items">
        {{ itemsCount }}
      </span>
    </div>
    <div class="table-paginate-controls">
      <template v-for="(number, key) in listOfNumbers">
        <button
          class="btn btn-light"
          :class="{ 'active': currentPage === number}"
          :key="key"
          @click="changePage(number)"
        >
          {{ number + 1 }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-table-paginate',
  data() {
    return {
      listOfNumbers: [],
      currentPage: 0
    }
  },
  props: {
    items: Array,
    perPage: {
      type: Number,
      default: 10
    },
    startPage: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.currentPage = this.startPage;
    this.paginate(this.items);
  },
  computed: {
    itemsCount() {
      const numOfItems = this.items.length
      const first = this.currentPage * this.perPage + 1
      const last = Math.min((this.currentPage * this.perPage) + this.perPage, numOfItems)
      return `${first}-${last} of ${numOfItems}`
    },
  },
  methods: {
    paginate(items) {
      if (items) {
        const index = this.currentPage * this.perPage;
        const paginatedItems = items.slice(index, index + this.perPage);
        this.$emit('paginatedItems', paginatedItems);
        this.createControls(items);
      }
    },
    createControls(items) {
      let numberOfPages = Math.ceil(items.length / this.perPage);
      this.listOfNumbers = [];
      for (let index = 0; index < numberOfPages; index++) {
        this.listOfNumbers.push(index);
      }
    },
    changePage(number) {
      this.currentPage = number;
      this.paginate(this.items);
    }
  },
  watch: {
      items(val) {
        this.paginate(val);
      }
    }
}
</script>

<style lang="scss">
  .table-paginate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: #343a40;
    border-color: #454d55;
    padding: 10px 15px;

    .btn {
      margin-left: 7px;
      font-weight: 700;
    }
  }
  
  .table-paginate-count {
    font-weight: 700;
  }
</style>
