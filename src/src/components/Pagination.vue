<template>
  <nav class="pagination is-centered">
    <a :disabled="currentPage <= 1" @click="changePage(currentPage - 1)" class="pagination-previous">Previous</a>
    <a :disabled="currentPage === pageCount" @click="changePage(currentPage + 1)" class="pagination-next">Next page</a>
    <ul class="pagination-list">
      <li v-if="hasFirst"><a class="pagination-link" @click="changePage(1)">1</a></li>
      <li v-if="hasFirstEllipsis"><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-for="page in pagesInRange"><a class="pagination-link" @click="changePage(page.number)" :class="{ 'is-current': page.isCurrent }">{{ page.number }}</a></li>
      <li v-if="hasLastEllipsis"><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-if="hasLast"><a class="pagination-link" @click="changePage(pageCount)">{{ pageCount }}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: Number,
    perPage: [Number, String],
    currentPage: Number
  },
  methods: {
    changePage (page) {
      if (page < 1 || page > this.pageCount) {
        return
      }
      this.$emit('changePage', page)
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.total / this.perPage)
    },
    hasFirst () {
      return this.currentPage >= 3
    },
    hasFirstEllipsis () {
      return this.currentPage >= 4
    },
    hasLast () {
      return this.currentPage <= this.pageCount - 2
    },
    hasLastEllipsis () {
      return this.currentPage < this.pageCount - 2 && this.currentPage <= this.pageCount - 3
    },
    pagesInRange () {
      const left = Math.max(1, this.currentPage - 1)
      const right = Math.min(this.currentPage + 1, this.pageCount)
      const pages = []
      for (let i = left; i <= right; i++) {
        pages.push({
          number: i,
          isCurrent: this.currentPage === i
        })
      }
      return pages
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-next {
  background-color: #000;
  &:hover {
    color: #fff;
  }
}

.pagination-previous {
  background-color: #000;
  &:hover {
    color: #fff;
  }
}
.pagination-ellipsis {
  color: #000;
}
.pagination-previous[disabled]:hover,
.pagination-next[disabled]:hover {
  color: #232323;
}
</style>
