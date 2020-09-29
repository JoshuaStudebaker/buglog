<template>
  <router-link
    class="col-md-4 p-3"
    :to="{ name: 'Bug', params: { bugId: bugProp.id } }"
  >
    <div class="card see-through rounded">
      <div class="card-header see-through-white">
        Humbug: {{ bugProp.title }}
      </div>
      <div class="card-body">
        <p class="card-text">{{ bugProp.description }}</p>
        <p class="card-text">
          <span v-if="bugProp.closed">Closed on:</span
          ><span v-if="!bugProp.closed">Last Edited on:</span>
          {{ new Date(bugProp.updatedAt).toUTCString() }}
        </p>
        <p>{{ bugProp.creatorEmail }}</p>
      </div>

      <div class="card-footer see-through-white">
        <p v-if="bugProp.closed" class="text-danger">Status: Closed</p>
        <p v-if="!bugProp.closed" class="text-success">Status: Open</p>
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
