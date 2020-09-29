<template>
  <div class="container-fluid scrooge-background">
    <div class="row p-2">
      <div class="col-md-6 p-3">
        <div
          class="text-light"
          v-if="
            activeBug.closed ||
              activeBug.creatorEmail != $auth.userInfo.email.toLowerCase()
          "
        >
          <h2>Bah Humbug!</h2>
        </div>
        <form
          @submit.prevent="editActiveBug"
          class="see-through p-2 rounded"
          v-if="
            !activeBug.closed &&
              activeBug.creatorEmail == $auth.userInfo.email.toLowerCase()
          "
        >
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="New Bug Name..."
              v-model="editedBug.title"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Edit Description"
              aria-describedby="helpId"
              v-model="editedBug.description"
            />
          </div>
          <button type="submit" class="btn btn-primary">Edit Bug</button>
        </form>
      </div>
      <div class="col-md-6 p-3">
        <form
          @submit.prevent="createNote"
          class="see-through p-2 rounded"
          v-if="!activeBug.closed"
        >
          <div class="form-group">
            <label for="noteContent">Content</label>
            <textarea
              v-model="newNote.content"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Create Note</button>
        </form>
      </div>
    </div>
    <div class="row  p-2">
      <div class="col-md-6">
        <div class="card see-through rounded shadow">
          <div class="card-header see-through-white">
            <h2 class="card-title">{{ activeBug.title }}</h2>
            <h6 class="card-subtitle text-muted">
              By: {{ activeBug.creatorEmail }}
            </h6>
          </div>
          <div class="card-body">
            <p class="card-text">{{ activeBug.description }}</p>
          </div>
          <div class="card-footer see-through-white py-1 px-3">
            <div v-if="!activeBug.closed">
              <form
                @submit.prevent="editActiveBug"
                v-if="
                  activeBug.creatorEmail == $auth.userInfo.email.toLowerCase()
                "
                class="mb-2"
              >
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    v-model="editedBug.closed"
                  />
                  <label class="form-check-label mb-1" for="exampleCheck1"
                    >Close Bug (this can't be undone!)</label
                  >
                </div>
                <button type="submit" class="btn btn-primary btn-sm">
                  Submit
                </button>
              </form>
              <div v-else>
                <p class="mb-1">Status: Open</p>
              </div>
            </div>
            <p class="mb-0">
              <span v-if="!activeBug.closed"
                >Last Updated:
                {{ new Date(activeBug.updatedAt).toUTCString() }}</span
              >
              <span v-else class="text-danger"
                >Closed on:
                {{ new Date(activeBug.updatedAt).toUTCString() }}</span
              >
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-6 scroll-x ">
        <table v-if="!activeNote.id" class="table see-through table-sm ">
          <thead class="see-through-white">
            <tr>
              <th scope="col">Note</th>
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
            <tr v-if="!notes[0]">
              <td>
                No notes created
              </td>
              <td></td>
              <td class="text-center"></td>

              <td class="text-center"></td>
            </tr>
          </tbody>
        </table>
        <table v-if="activeNote.id" class="table see-through">
          <thead class="see-through-white">
            <tr>
              <th scope="col">Note</th>

              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <td>{{ this.activeNote.content }}</td>

            <td>
              {{ this.activeNote.flagged }}
            </td>
          </tbody>
        </table>
        <form
          v-if="activeNote.id"
          @submit.prevent="editNote"
          class="see-through p-2"
        >
          <div class="form-group">
            <label for="noteContent">Content</label>
            <textarea
              v-model="editedNote.content"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="status">Choose Status:</label>
            <select
              class="form-control"
              id="status"
              v-model="editedNote.flagged"
            >
              <option value="pending">pending</option>
              <option value="completed">completed</option>
              <option value="rejected">rejected</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success">
            Edit Note (or Cancel)
          </button>
        </form>
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
      this.editedNote.id = this.activeNote.id;
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

.scrooge-background {
  background-image: url("../assets/Scrooge-home.jpg");
  background-size: cover;
  background-position: top;
  min-height: 100vh;
}

.see-through {
  background-color: hsla(218, 19%, 89%, 0.8);
}

.stave-shadow-black {
  text-shadow: 0.5px 0.5px 0px black;
}

.scroll-x {
  overflow-x: auto;
}
</style>
