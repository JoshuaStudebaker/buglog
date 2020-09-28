<template>
  <div class="home container-fluid d-flex flex-column">
    <div class="row">
      <label for="toggleView">Filter</label>
      <select class="form-control" id="toggleView" v-model="toggleView">
        <option value="1">All</option>
        <option value="2">Open</option>
        <option value="3">Closed</option>
      </select>
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
  name: "home",
  data() {
    return { toggleView: 1 };
  },
  components: {
    bugsComponent,
  },
  mounted() {
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
};
</script>
