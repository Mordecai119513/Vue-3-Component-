const Card = {
  props: ["item"],
  template: `
    <div class="col-md-6 py-2">
      <div class="card">
        <div class="card bg-dark text-white text-left">
          <img class="card-img-top img-cover" height="155" :src="item.Picture1" :alt="item.Name">
          <div class="card-img-overlay d-flex justify-content-between align-items-end p-0 px-3" style="background-color: rgba(0, 0, 0, .2)">
            <h5 class="card-img-title-lg">{{ item.Name }}</h5>
            <h5 class="card-img-title-sm">{{ item.Zone }}</h5>
          </div>
        </div>
        <div class="card-body text-left">
          <p class="card-text"><i class="far fa-clock fa-clock-time"></i>&nbsp;{{ item.Opentime }}</p>
          <p class="card-text"><i class="fas fa-map-marker-alt fa-map-gps"></i>&nbsp;{{ item.Add }}</p>
          <p class="card-text"><i class="fas fa-mobile-alt fa-mobile"></i>&nbsp;{{ item.Tel }}</p>
          <div v-if="item.Ticketinfo">
            <p class="card-text"><i class="fas fa-tags text-warning"></i>&nbsp;{{ item.Ticketinfo }}</p>
          </div>
        </div>
      </div>
    </div>
    `,
};

const Pagination = {
  props: ["currentPage", "totalPage"],
  emits: ["changePage"],
  template: `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
          <a class="page-link" href="#" @click.prevent="$emit('changePage', currentPage - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="pageNum in totalPage" :key="pageNum" :class="{ active: pageNum === currentPage }">
          <a class="page-link" href="#" @click.prevent="$emit('changePage', pageNum)">{{ pageNum }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage >= totalPage }">
          <a class="page-link" href="#" @click.prevent="$emit('changePage', currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
    `,
};

const App = {
  components: {
    Card,
    Pagination,
  },
  data() {
    return {
      jsonData: [],
      currentPage: 1,
      perPage: 20,
    };
  },
  computed: {
    displayedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.jsonData.slice(start, end);
    },
    totalPage() {
      return Math.ceil(this.jsonData.length / this.perPage);
    },
  },
  methods: {
    changePage(pageNum) {
      if (pageNum >= 1 && pageNum <= this.totalPage) {
        this.currentPage = pageNum;
      }
    },
    fetchData() {
      const apiUrl =
        "https://raw.githubusercontent.com/hexschool/KCGTravel/refs/heads/master/datastore_search.json";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.jsonData = data.result.records;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};

Vue.createApp(App).mount(`#app`);
