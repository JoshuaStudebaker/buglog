<template>
  <div class="home container-fluid d-flex flex-column">
    <div class="row">
      <div class="card col-md-4 my-2" v-for="iBug in bugs" :key="iBug.id">
        <div class="card-header">
          <h5>Bug Title: {{ bugs.title }}</h5>
        </div>
        <div class="card-body">
          <p class="card-text">Description: {{ bugs.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getAllBoards");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
};
</script>
