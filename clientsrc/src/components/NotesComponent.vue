<template>
  <tr>
    <td>{{ noteProp.content }}</td>
    <td>{{ noteProp.creatorEmail }}</td>
    <td class="text-center">
      {{ noteProp.flagged }}
    </td>
    <td class="text-center">
      <i class="fas fa-pencil-alt" @click="editNoteToggle(noteProp.id)"></i>
    </td>

    <td class="text-center">
      <i class="fas fa-trash" @click="deleteNote(noteProp.id)"></i>
    </td>
  </tr>
</template>

<script>
export default {
  name: "notes-component",
  props: ["noteProp"],
  components: {},
  data() {
    return {
      editedNote: {},
    };
  },
  mounted() {},

  computed: {},
  methods: {
    deleteNote(id) {
      this.$store.dispatch("deleteNote", id);
    },
    // editNote(id) {
    //   this.editedNote.id = id;
    //   this.$store.dispatch("editNote", this.editedNote);
    //   this.noteToggle = true;
    // },

    // editNoteToggle() {
    //   this.noteToggle = false;
    // },
  },
};
</script>

<style></style>
