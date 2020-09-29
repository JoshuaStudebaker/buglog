<template>
  <div class="bugs container-fluid d-flex flex-column scrooge-background">
    <div class="row my-2">
      <div class="col-6">
        <label for="toggleView">Filter</label>
        <select class="form-control" id="toggleView" v-model="toggleView">
          <option value="1">All</option>
          <option value="2">Open</option>
          <option value="3">Closed</option>
        </select>
      </div>
      <div class="col-6">
        <button v-if="!formShow" class="btn btn-primary" @click="formShowClick">
          Report Bug
        </button>
        <form v-if="formShow" @submit.prevent="createBug" class="shadow p-3">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="bugTitle"
              v-model="newBug.title"
              placeholder="Enter Bug Name..."
            />
          </div>
          <div class="form-group">
            <textarea
              rows="4"
              class="form-control"
              id="bugDescription"
              v-model="newBug.description"
              placeholder="Enter Description..."
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <button
            type="button"
            class="btn btn-danger mx-2"
            @click="formShowCancel"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div class="row" v-if="toggleView == 1">
      <bugs-component v-for="iBug in bugs" :key="iBug.id" :bugProp="iBug" />
    </div>
    <div class="row" v-if="toggleView == 2">
      <bugs-component
        v-for="iBug in bugs"
        :key="iBug.id"
        :bugProp="iBug"
        v-show="!iBug.closed"
      />
    </div>
    <div class="row" v-if="toggleView == 3">
      <bugs-component
        v-for="iBug in bugs"
        :key="iBug.id"
        :bugProp="iBug"
        v-show="iBug.closed"
      />
    </div>
  </div>
</template>

<script>
import bugsComponent from "../components/BugsComponent";
export default {
  name: "bugs",
  mounted() {
    this.$store.dispatch("getProfile");
    this.$store.dispatch(
      "getBugs",
      "?creatorEmail=" + this.$auth.userInfo.email
    );
  },
  components: {
    bugsComponent,
  },
  data() {
    return {
      newBug: {},
      toggleView: 1,
      formShow: false,
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    bugs() {
      let bugs = this.$store.state.bugs;
      console.log("bugs", bugs);
      return this.$store.state.bugs;
    },
  },
  methods: {
    createBug() {
      console.log("adding bug?");
      console.log("newBug on Bug.vue", this.newBug);
      this.$store.dispatch("createBug", this.newBug);
      this.newBug = { title: "", description: "" };
      this.formShow = false;
    },

    formShowClick() {
      this.formShow = true;
    },

    formShowCancel() {
      this.formShow = false;
    },
  },
};
</script>

<style>
.scrooge-background {
  background-image: url("../assets/Scrooge-home.jpg");
  background-size: cover;
  background-position: top;
  min-height: 100vh;
}

.see-through {
  background-color: hsla(218, 19%, 89%, 0.8);
}

.stave-shadow-black {
  text-shadow: 0.5px 0.5px 0px black;
}
</style>
