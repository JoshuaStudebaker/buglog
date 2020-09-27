<template> </template>

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
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: "" };
    },
    deleteBug(id) {
      this.$store.dispatch("deleteBug", id);
    },
  },
};
</script>

<style></style>
