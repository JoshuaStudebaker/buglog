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
      <form @submit.prevent="createNote">
        <div class="form-group">
          <label for="noteContent">Content</label>
          <textarea
            v-model="newNote.content"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Create Note</button>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Note</th>
            <th scope="col">Creator</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <notes-component
            v-for="iNote in notes"
            :key="iNote.id"
            :noteProp="iNote"
          />
        </tbody>
      </table>
      <form v-if="activeNote.id" @submit.prevent="editNote">
        <div class="form-group">
          <label for="noteContent">Content</label>
          <textarea
            v-model="editedNote.content"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success">Edit Note</button>
      </form>
    </div>
    <div class="col-6" v-if="!activeBug.closed">
      <form @submit.prevent="editActiveBug">
        <input
          type="text"
          class="form-control mx-3"
          placeholder="New Bug Name..."
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
      editedNote: {},
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

    activeNote() {
      return this.$store.state.activeNote;
    },
  },

  methods: {
    createNote() {
      this.newNote.bug = this.activeBug.id;
      this.newNote.flagged = "pending";
      console.log("new note", this.newNote);
      this.$store.dispatch("createNote", this.newNote);
    },
    editActiveBug() {
      console.log("edit bug", this.editedBug);
      this.$store.dispatch("editBug", this.editedBug);
    },

    editNote() {
      this.$store.dispatch("editNote", this.editedNote);
    },
    editNoteToggle(id) {
      console.log("editToggle", id);
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
