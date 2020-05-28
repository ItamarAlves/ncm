 <template>
  <div>
    <q-card square class="bg-theme">
      <!-- <img src="http://srvwta/portal/resources/logo-winthor.png" /> -->
      <q-card-section class="bg-primary">
        <q-input
          @keydown.enter="filter"
          v-model="search"
          dark
          placeholder="Pesquisar"
          standout
          dense
          clearable
          rounded
        ></q-input>
      </q-card-section>
    </q-card>
    <q-list v-for="(item, index) in filtered" :key="index">
      <q-expansion-item
        :label="item.label"
        expand-icon-class="text-white"
        v-model="item.expanded"
        group="menu"
        class="text-white text-subtitle1 bg-primary text-weight-bold"
      >
        <q-separator />
        <q-card>
          <q-list class="bg-primary" separator>
            <q-item
              :key="index"
              v-for="(child, index) in item.childrem"
              active-class="menu-item-active-route "
              :to="`/${item.path}${child.path}`"
            >
              <q-item-section class="texto text-weight-regular">{{child.label}}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      expanded: false,
      filtered: [],
      items: [
        {
          label: "Produtos",
          path: "produtos/",
          expanded: false,
          childrem: [{ label: "Consultar NCM", path: "produtos-consulta" }]
        }
      ]
    };
  },

  mounted() {
    this.filtered = [...this.items];
  },

  methods: {
    filter1(arr, term) {
      var matches = [];

      var self = this;

      if (!Array.isArray(arr)) return matches;

      arr.forEach(function(i) {
        if (i.label.toLowerCase().includes(term.toLowerCase())) {
          const filterData =
            i.childrem && Array.isArray(i.childrem)
              ? i.childrem.filter(values =>
                  values.label.toLowerCase().includes(term.toLowerCase())
                )
              : [];

          i.children = filterData;

          matches.push(i);
        } else {
          let childResults = self.filter1(i.childrem, term);
          if (childResults.length)
            matches.push(Object.assign({}, i, { childrem: childResults }));
        }
      });

      return matches;
    },

    filter() {
      if (this.search.length > 0) {
        const filterData = this.filter1(this.items, this.search);

        this.filtered = [...filterData];
        this.filtered.forEach(e => (e.expanded = true));
      } else {
        this.filtered = this.items;
        this.filtered.forEach(e => (e.expanded = false));
      }
    }
  }
};
</script>

<style >
.menu-title {
  font-size: 1rem !important;
}

.bg-header-expansion-color {
  /*background-color: #0793b6;*/
  background-color: #2c373a;
}

.bg-item-expansion-color {
  /*background-color: #0fb2dc;*/
  background-color: #2c373a;
}

.texto {
  font-family: NunitoSans-Bold, sans-serif;
  font-size: 14px;
  line-height: 24px;

  display: table-cell;
  vertical-align: sub;
  width: 100%;
}

.menu-item-active-route {
  /*color: yellow;*/
  background-color: rgba(0, 0, 0, 0.3);
  color: #e5f835;
}

.brand img {
  background-color: rgba(0, 0, 0, 0.3);
  background-color: #2c373a;
}

.text-black {
  color: black;
}
</style>