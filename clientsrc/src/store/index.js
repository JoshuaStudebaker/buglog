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
    setActiveBug(state, activeBug) {
      state.activeBug = activeBug;
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
        console.log("get bugs?");
        let res = await api.get("bugs");
        console.log("get bugs", res);
        commit("setBugs", res.data);
      } catch (error) {
        console.error("cannot get bugs - sorry");
      }
    },

    async createBug({ commit, state }, newBug) {
      console.log("createBug", newBug);
      let res = await api.post("bugs/", newBug);
      console.log("createBug - res", res);
      commit("setBugs", [...state.bugs, res.data]);
    },

    async getActiveBug({ commit }, id) {
      try {
        console.log("active bug id", id);
        let res = await api.get("bugs/" + id);
        console.log("active bug res", res);
        commit("setActiveBug", res.data);
      } catch (error) {
        console.error("cannot get active board");
      }
    },
  },
});
