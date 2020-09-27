<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <router-link :to="{ name: 'Bugs' }"
      ><button class="btn btn-primary">Go to Bugs</button></router-link
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
img {
  max-width: 100px;
}
</style>
