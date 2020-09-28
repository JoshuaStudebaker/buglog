<template>
  <div class="bugs container-fluid d-flex flex-column">
    <div class="row">
      <form @submit.prevent="createBug">
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
      </form>
    </div>
    <div>
      <form>
        <div class="form-group">
          <label for="toggleView">Filter</label>
          <select class="form-control" id="toggleView" v-model="toggleView">
            <option value="1">All</option>
            <option value="2">Open</option>
            <option value="3">Closed</option>
          </select>
        </div>
      </form>
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
    this.$store.dispatch("getBugs");
  },
  components: {
    bugsComponent,
  },
  data() {
    return {
      newBug: {},
      toggleView: 1,
    };
  },
  computed: {
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
    },
  },
};
</script>

<style></style>
