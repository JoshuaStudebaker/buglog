<template>
  <router-link :to="{ name: 'Bug', params: { bugId: bugProp.id } }">
    <div class="card col-md-4">
      <div class="card-header">{{ bugProp.title }}</div>
      <div class="card-body">
        <p class="card-text">{{ bugProp.description }}</p>
      </div>
      <div class="card-footer green-font" v-if="!bugProp.closed">
        <p>Status: Open</p>
      </div>
      <div class="card-footer red-font" v-if="bugProp.closed">
        <p>Status: Closed</p>
      </div>
    </div>
  </router-link>
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

<style>
.red-font {
  color: red;
}

.green-font {
  color: green;
}
</style>
