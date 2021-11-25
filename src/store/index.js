import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  columns: [],
  selectedColumns: {},
  chartValues: [],
  showChart: false,
};

export const mutations = {
  SET_COLUMNS(state, payload) {
    state.columns = payload;
  },
  COLUMNS_VALUES(state, payload) {
    state.selectedColumns = payload;
  },
  SET_CHART_VALUES(state, payload) {
    state.chartValues = payload;
    state.showChart = true;
  },
  HideChart(state) {
    state.showChart = false;
  },
};
export const actions = {
  GET_COLUMNS({ commit }) {
    return axios
      .get("https://plotter-task.herokuapp.com/columns")
      .then((response) => commit("SET_COLUMNS", response.data))
      .catch((error) => console.log(error));
  },

  GET_COLUMNS_VALUES({ commit }, columnsValues) {
    return axios
      .post("https://plotter-task.herokuapp.com/data", columnsValues)
      .then((response) => commit("SET_CHART_VALUES", response.data))
      .catch((error) => {
        console.error("There was an error!", error.message);
      });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
