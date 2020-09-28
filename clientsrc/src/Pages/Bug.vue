<template>
  <div>
    <div class="card col-6">
      <div class="card-header">{{ activeBug.title }}</div>
      <div class="card-body">{{ activeBug.description }}</div>
      <div class="card-footer">
        <form @submit.prevent="editActiveBug">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="editedBug.closed"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <div class="col-6">
      <notes-component
        v-for="iNote in notes"
        :key="iNote.id"
        :noteProp="iNote"
      />
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
      editedBug: {},
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
      console.log("edit bug", this.editedBug);
      this.$store.dispatch("editBug", this.editedBug);
    },
  },
};
</script>

<style></style>
