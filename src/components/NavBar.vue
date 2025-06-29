<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand to="/" tag="router-link">Nav Bar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- צד שמאל: קישורים ראשיים -->
      <b-navbar-nav class="me-auto">
        <b-nav-item to="/" tag="router-link">Home</b-nav-item>
        <b-nav-item to="/search" tag="router-link">Search</b-nav-item>
        <b-nav-item to="/about" tag="router-link">About</b-nav-item>
      </b-navbar-nav>

      <!-- צד ימין: משתמש / התחברות -->
      <b-navbar-nav>
        <template v-if="store.username.value">
          <b-nav-text class="me-2">Hello {{ store.username.value }}</b-nav-text>

          <b-nav-item-dropdown text="Personal Area" right toggle-class="nav-link">
            <b-dropdown-item to="/favorites" tag="router-link">My Favorites</b-dropdown-item>
            <b-dropdown-item to="/my-recipes" tag="router-link">My Recipes</b-dropdown-item>
            <b-dropdown-item to="/family" tag="router-link">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/create" tag="router-link">Create Recipe</b-nav-item>
          <b-nav-item @click="logout">Logout</b-nav-item>
        </template>

        <template v-else>
          <b-nav-text class="me-2">Hello guest</b-nav-text>
          <b-nav-item to="/login" tag="router-link">Login</b-nav-item>
          <b-nav-item to="/register" tag="router-link">Register</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  setup() {
    const store = window.store;

    const logout = async () => {
      try {
        await window.axios.post("/logout");
        store.username.value = null;
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

    return { store, logout };
  },
};
</script>

<style scoped>
.me-2 {
  margin-inline-end: 1rem;
}
</style>
