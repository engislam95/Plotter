import { createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import { actions, mutations } from "../../src/store/index";
import columns from "../json/__columns__.json";
import chartValues from "../json/__charts__.json";
Vue.use(Vuex);

describe("actions", () => {
  let store;
  let setDataMock;
  beforeEach(() => {
    setDataMock = jest.fn();
    store = new Vuex.Store({
      state: { columns: [] },
      mutations: {
        SET_COLUMNS: mutations.SET_COLUMNS,
      },
      actions: {
        GET_COLUMNS: actions.GET_COLUMNS,
      },
    });
  });
  it("mocks an ajax calling using axios to get columns", () => {
    return store
      .dispatch("GET_COLUMNS")
      .then(() => expect(store.state.columns).toEqual(columns));
  });
});

describe("mutations", () => {
  it("fetch column values to plot chart", () => {
    createLocalVue().use(Vuex);
    const state = {
      selectedColumns: {},
    };

    const store = new Vuex.Store({ state, mutations });
    let columnsValues = {
      measures: ["Cost"],
      dimension: "Product",
    };

    store.commit("COLUMNS_VALUES", columnsValues);

    expect(state.selectedColumns).toBe(columnsValues);
  });
});

describe("actions", () => {
  let store;
  let setDataMock;
  beforeEach(() => {
    setDataMock = jest.fn();
    store = new Vuex.Store({
      state: { chartValues: [] },
      mutations: {
        SET_CHART_VALUES: mutations.SET_CHART_VALUES,
      },
      actions: {
        GET_COLUMNS_VALUES: actions.GET_COLUMNS_VALUES,
      },
    });
  });
  let columnsValues = {
    measures: ["Cost"],
    dimension: "Product",
  };
  it("mocks an ajax calling using axios to get chart values", () => {
    return store
      .dispatch("GET_COLUMNS_VALUES", columnsValues)
      .then(() => expect(store.state.chartValues).toEqual(chartValues));
  });
});
