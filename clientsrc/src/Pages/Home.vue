<template>
  <div class="home container-fluid d-flex flex-column">
    <div class="row">
      <bugs-component v-for="iBug in bugs" :key="iBug.id" :bugProp="iBug" />
    </div>
  </div>
</template>

<script>
import bugsComponent from "../components/BugsComponent";
export default {
  name: "home",
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
