<template>
  <p>{{ noteProp.content }} - {{ noteProp.flagged }}</p>
</template>

<script>
export default {
  name: "notes-component",
  props: ["noteProp"],
  components: {},
  data() {
    return {
      editedNote: {},
      // editToggle: false,
    };
  },
  mounted() {},

  computed: {},
  methods: {
    deleteNote(id) {
      let payload = {
        id: id,
        bugId: this.noteProp.bugId,
      };
      this.$store.dispatch("deleteNote", payload);
    },
    editNote(id) {
      this.editedNote.id = id;
      this.$store.dispatch("editNote", this.editedNote);
      this.editToggle = false;
    },
  },
};
</script>

<style></style>
