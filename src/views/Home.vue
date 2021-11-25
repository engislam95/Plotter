<template>
  <div class="home" style="height: 100%">
    <div class="row h-100 me-0">
      <div class="col-lg-4 sidebar">
        <a
          v-for="column in columns"
          :key="column.name"
          draggable
          @dragstart="dragColumn($event, column)"
          href="#home"
        >
          <i class="fa fa-arrows-h me-3" aria-hidden="true"></i>
          <span class="me-2"> {{ column.name }} </span>
        </a>
      </div>
      <div class="col-lg-8 content">
        <div class="mt-5">
          <div class="input-group">
            <span class="input-group-text">Dimension</span>
            <input-tag
              @input="dimensionDroped()"
              :limit="DimensionLimit"
              :read-only="draggedItemType == 'measure'"
              v-model="DimensionTags"
              :add-tag-on-blur="true"
              class="form-control"
            ></input-tag>
            <button
              class="btn bg-transparent"
              style="margin-left: -40px; z-index: 100"
              @click="clearDimensionTags()"
            >
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </div>
          <small class="text-warning"> Only accept function Dimension </small>
        </div>
        <div class="mt-3 mb-3">
          <div class="input-group">
            <span class="input-group-text">Measure</span>
            <input-tag
              @input="measureDroped()"
              :limit="MeasureLimit"
              :read-only="draggedItemType == 'dimension'"
              v-model="MeasureTags"
              :add-tag-on-blur="true"
              class="form-control"
            ></input-tag>
            <button
              class="btn bg-transparent"
              style="margin-left: -40px; z-index: 100"
              @click="clearMeasureTags()"
            >
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </div>
          <small class="text-info">
            Acceptable to have one measure only if you want to accept more than
            one then update the limit {number} </small
          ><br />
          <small class="text-warning"> Only accept function Measure </small>
        </div>
        <button type="button" class="btn btn-info text-white" @click="show()" :disabled="MeasureTags.length == 0 || DimensionTags.length == 0">
          Show
        </button>
        <div class="charts mt-5">
          <LineChartPlotter v-if="this.$store.state.showChart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputTag from "vue-input-tag";
import LineChartPlotter from "../components/LineChartPlotter.vue";
export default {
  name: "Home",
  components: {
    InputTag,
    LineChartPlotter,
  },
  data() {
    return {
      DimensionTags: [],
      MeasureTags: [],
      draggedItemType: "",
      DimensionLimit: 1,
      MeasureLimit: 1,
    };
  },
  computed: {
    columns() {
      return this.$store.state.columns;
    },
  },
  created() {
    this.$store.dispatch("GET_COLUMNS");
  },

  methods: {
    dragColumn(e, item) {
      e.dataTransfer.setData("text/plain", item.name);
      this.draggedItemType = item.function;
    },
    clearMeasureTags() {
      this.MeasureTags = [];
      this.$store.commit("HideChart");
    },
    clearDimensionTags() {
      this.DimensionTags = [];
      this.$store.commit("HideChart");
    },
    dimensionDroped() {
      if (this.DimensionTags.length == 0) {
        this.$store.commit("HideChart");
      }
    },
    measureDroped() {
      if (this.MeasureTags.length == 0) {
        this.$store.commit("HideChart");
      }
    },
    show() {
      let columnsValues = {
        measures: this.MeasureTags,
        dimension: this.DimensionTags[0],
      };
      this.$store.commit("COLUMNS_VALUES", columnsValues);
      this.$store.dispatch("GET_COLUMNS_VALUES", columnsValues);
    },
  },
};
</script>
<style  lang="scss">
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px !important;
  background: #34548d;
  box-shadow: 0 0 15px 0 #023b6a1a;
  height: 100%;
  position: relative;
  overflow: auto;
  padding-right: 0px !important;
  a {
    display: block;
    color: #fff;
    text-align: left;
    padding: 17px 23px;
    text-decoration: none;
  }
  a.active {
    background-color: #04aa6d;
    color: white;
  }
  a:hover:not(.active) {
    background-color: #f6f9ff;
    color: #0dcaf0;
  }
}
.content {
  margin: 0 auto;
  .vue-input-tag-wrapper .input-tag {
    background-color: #012970cc !important;
    border-radius: 2px;
    border: 1px solid #012970 !important;
    color: #fff !important;
    font-size: 15px !important;
    padding: 6px;
  }
  .vue-input-tag-wrapper .input-tag .remove {
    color: #0dcaf0 !important;
    text-decoration: none !important;
    padding: 3px 4px !important;
  }
  .removeBtn,
  .input-group-text {
    color: #fff !important;
    background-color: #0dcaf0 !important;
  }
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    a {
      float: left;
    }
    div.content {
      margin-left: 0;
    }
  }
}
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>