<template>
  <router-link
    class="col-md-4 p-3"
    :to="{ name: 'Bug', params: { bugId: bugProp.id } }"
  >
    <div class="card see-through rounded">
      <div class="card-header see-through-white">
        <h5 class="card-title">Humbug: {{ bugProp.title }}</h5>
        <h6 class="card-subtitle text-muted">By: {{ bugProp.creatorEmail }}</h6>
      </div>
      <div class="card-body">
        <p class="card-text">{{ bugProp.description }}</p>
      </div>

      <div class="card-footer see-through-white py-1">
        <p v-if="bugProp.closed" class="text-danger mb-0">Status: Closed</p>
        <p v-if="!bugProp.closed" class="mb-0">Status: Open</p>
        <p class="mb-0">
          <span v-if="bugProp.closed" class="text-danger"
            >Closed on: {{ new Date(bugProp.updatedAt).toUTCString() }}</span
          ><span v-if="!bugProp.closed"
            >Last Updated: {{ new Date(bugProp.updatedAt).toUTCString() }}</span
          >
        </p>
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

.see-through {
  background-color: hsla(218, 19%, 89%, 0.8);
}

.see-through-white {
  background-color: hsla(218, 19%, 98%, 0.8);
}
</style>
