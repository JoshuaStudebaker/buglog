<template>
  <div class="home scrooge-background container-fluid d-flex flex-column">
    <div class="row text-light my-3 pr-3">
      <div class="col-6 d-flex align-items-center stave-shadow-black">
        <h1>Track your Humbugs!</h1>
      </div>
      <div class="col-6 see-through shadow py-3 rounded">
        <label for="toggleView" class="text-light stave-shadow-black"
          ><h5>Filter by Status:</h5></label
        >
        <select class="form-control" id="toggleView" v-model="toggleView">
          <option value="1">All</option>
          <option value="2">Open</option>
          <option value="3">Closed</option>
        </select>
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

<style scoped>
.scrooge-background {
  background-image: url("../assets/Scrooge-home.jpg");
  background-size: cover;
  background-position: bottom;
}

.see-through {
  background-color: hsla(218, 19%, 89%, 0.8);
}

.stave-shadow-black {
  text-shadow: 0.5px 0.5px 0px black;
}
</style>
