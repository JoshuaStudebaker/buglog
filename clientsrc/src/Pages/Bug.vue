<template>
  <div>
    {{ activebug.title }}
  </div>
</template>

<script>
import notesComponent from "../components/NotesComponent";
export default {
  name: "bug",
  components: {
    notesComponent,
  },
  data() {
    return {
      newNote: {},
      editBug: {},
      editNote: {},
    };
  },

  props: ["bugId"],
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.bugId);
    this.$store.dispatch("getNotesByBugId", this.$route.params.bugId);
  },
  computed: {
    activeBug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
  },

  methods: {
    createNote() {
      let payload = {
        title: this.newNote.title,
        bugId: this.bug.id,
      };
      this.$store.dispatch("createNote", payload);
    },
    editActiveBug() {
      this.$store.dispatch("editBug", this.editBug);
    },
  },
};
</script>

<style>
</style>
