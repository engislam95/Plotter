<template>
  <div class="about">
    <div id="chart" v-if="chartValues[1].values">
      <apexchart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "LineChartPlotter",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: this.$store.state.chartValues[1].name,
          data: this.$store.state.chartValues[1].values,
        },
      ],
      chartOptions: {
        chart: {
          height: 160,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          group: "social",
          zoom: {
            enabled: true,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text:
            this.$store.state.chartValues[1].name +
            " " +
            "by" +
            " " +
            this.$store.state.chartValues[0].name,
          align: "left",
          style: {
            fontSize: "20px",
            color: "#34548d",
          },
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], 
            opacity: 0.5,
          },
        },
        yaxis: {
          title: {
            text: this.$store.state.chartValues[1].name,
            style: {
              fontSize: "15px",
              color: "#34548d",
            },
          },
        },
        xaxis: {
          categories: this.$store.state.chartValues[0].values,
          minWidth: 40,
          title: {
            text: this.$store.state.chartValues[0].name,
            style: {
              fontSize: "15px",
              color: "#34548d",
            },
          },
        },
      },
    };
  },
  computed: {
    chartValues() {
      return this.$store.state.chartValues;
    },
  },
};
</script>

