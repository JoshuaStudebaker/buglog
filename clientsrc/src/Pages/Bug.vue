<template>
  <div>
    <div class="card">
      <div class="card-header">{{ activeBug.title }}</div>
      <div class="card-body">{{ activeBug.description }}</div>
      <div class="card-footer">
        <!-- <button type="button" class="btn btn-primary" @click="openNoteForm">
          Open Note Form
        </button> -->
      </div>
    </div>
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

<style></style>
