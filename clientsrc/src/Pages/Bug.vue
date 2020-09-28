<template>
  <div class="row">
    <div class="card col-6">
      <div class="card-header">{{ activeBug.title }}</div>
      <div class="card-body">
        <p>{{ activeBug.description }}</p>
        <p v-if="activeBug.closed">Closed</p>
        <p v-if="!activeBug.closed">Open</p>
      </div>
      <div class="card-footer" v-if="!activeBug.closed">
        <form @submit.prevent="editActiveBug">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="editedBug.closed"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Close Bug (this can't be undone!)</label
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
    <div class="col-6" v-if="!activeBug.closed">
      <form @submit.prevent="editActiveBug">
        <input
          type="text"
          class="form-control mx-3"
          placeholder="New Bug Name..."
          aria-describedby="helpId"
          v-model="editedBug.title"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Edit Description"
          aria-describedby="helpId"
          v-model="editedBug.description"
        />
        <button type="submit" class="btn btn-warning">Edit Bug</button>
      </form>
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
