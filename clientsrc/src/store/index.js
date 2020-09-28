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
    notes: [],
    activeNote: {},
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
    setActiveNote(state, activeNote) {
      state.activeNote = activeNote;
    },
    setNotes(state, notes) {
      state.notes = notes;
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

    async createNote({ commit, state }, newNote) {
      try {
        console.log("createNote", newNote);
        let res = await api.post("notes/", newNote);
        console.log("createNote - res", res);
        commit("setNotes", [...state.notes, res.data]);
      } catch (error) {
        console.error("cannot get create note");
      }
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

    async createActiveNote({ commit, state }, id) {
      try {
        console.log("createActiveNote: id", id);
        let res = state.notes.filter((n) => n.id == id);
        console.log("createActiveNote: full data", res);
        commit("setActiveNote", res[0]);
      } catch (error) {
        console.error("cannot get specific note");
      }
    },
    async getNotesByBugId({ commit }, id) {
      try {
        console.log("notes store");
        let res = await api.get("bugs/" + id + "/notes");
        console.log("res notes", res);
        commit("setNotes", res.data);
      } catch (error) {
        console.error("cannot get notes");
      }
    },
    async editBug({ commit, state }, editData) {
      try {
        console.log(editData);
        let res = await api.put("bugs/" + state.activeBug.id, editData);
        commit("setActiveBug", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
