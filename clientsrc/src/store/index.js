import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getBugs({ commit }) {
      try {
        let res = await api.get("bugs/");
        commit("setBugs", res.data);
      } catch (error) {
        console.error("cannot get bugs - sorry");
      }
    },
  },
});
