<template>
  <tr>
    <td>
      {{ noteProp.content }}<br /><span class="text-muted"
        >By: {{ noteProp.creatorEmail }}</span
      >
    </td>
    <td>
      {{ noteProp.flagged }}
    </td>
    <td class="text-center">
      <i
        v-if="noteProp.creatorEmail == $auth.userInfo.email.toLowerCase()"
        class="fas fa-pencil-alt"
        @click="setActiveNote(noteProp.id)"
      ></i>
    </td>

    <td class="text-center">
      <i
        v-if="noteProp.creatorEmail == $auth.userInfo.email.toLowerCase()"
        class="fas fa-trash"
        @click="deleteNote(noteProp.id)"
      ></i>
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

    setActiveNote(id) {
      console.log("setActiveNote: id", id);
      this.$store.dispatch("createActiveNote", id);
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
