<template>
  <div>{{ bugProp.title }} - {{ bugProp.description }}</div>
</template>

<script>
export default {
  name: "bugs-component",
  props: ["bugProp"],
  components: {},
  data() {
    return {
      editedBug: {},
      // editToggle: false,
    };
  },
  mounted() {},

  computed: {},
  methods: {
    editBug(id) {
      this.editedBug.id = id;
      this.$store.dispatch("editBug", this.editedBug);
      this.editToggle = false;
    },
  },
};
</script>

<style></style>
