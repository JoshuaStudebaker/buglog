<template>
  <div
    class="about scrooge-background container-fluid text-light stave-shadow-black py-3"
  >
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <router-link :to="{ name: 'Bugs' }"
      ><button class="btn btn-primary">Go to Your Humbugs</button></router-link
    >
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
};
</script>

<style scoped>
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
</style>
