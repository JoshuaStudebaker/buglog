<template>
  <div class="bugs container-fluid d-flex flex-column">
    <div class="row">
      <form @submit.prevent="addBug">
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
            placeholder="Enter Description..."
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
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
  name: "bugs",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      newBug: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {
    addBug() {
      console.log("adding bug?");
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: "" };
    },
  },
};
</script>

<style></style>
