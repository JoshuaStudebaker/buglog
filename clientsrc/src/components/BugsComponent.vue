<template>
  <p>{{ bugProp.title }} - {{ bugProp.description }}</p>
</template>

<script>
export default {
  name: "bugs-component",
  props: ["bugProp"],
  components: {},
  data() {
    return {};
  },
  mounted() {},

  computed: {},
  methods: {},
};
</script>

<style></style>
