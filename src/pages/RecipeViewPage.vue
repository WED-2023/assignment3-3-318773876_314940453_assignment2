<template>
  <div class="container">
    <div v-if="recipe">
      <!-- Header -->
      <div class="recipe-header mt-3 mb-4 text-center">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="recipe-image" alt="recipe image" />
      </div>

      <!-- Metadata (Preview style) -->
      <div class="card-body text-center">
        <p class="card-text">
          <strong>time in minutes:</strong>
          {{ recipe.prep_time_minutes || recipe.readyInMinutes }} min
        </p>

        <p class="card-text">
          <strong>tags:</strong> {{ recipe.tags || "none" }}
        </p>

        <p class="card-text" v-if="recipe.has_gluten !== undefined">
          <strong>gluten:</strong>
          {{ recipe.has_gluten === true ? "contains" : recipe.has_gluten === false ? "gluten-free" : "—" }}
        </p>

        <p class="card-text">
          <strong>viewed:</strong> {{ recipe.was_viewed ? "✔" : "—" }}
        </p>

        <p class="card-text">
          <strong>favorite:</strong> {{ recipe.is_favorite ? "★" : "—" }}
        </p>

        <p class="card-text">
          <strong>servings:</strong> {{ recipe.servings || "—" }}
        </p>
      </div>

      <!-- Ingredients & Instructions -->
      <div class="wrapper">
        <div class="wrapped">
          <h4>Ingredients list:</h4>
          <ul>
            <li v-for="(ing, index) in recipe.ingredients" :key="index">
              {{ ing.amount }} ({{ ing.name }})
            </li>
          </ul>
        </div>

        <div class="wrapped">
          <h4>Instructions:</h4>
          <ol>
            <li v-for="(step, index) in recipe.instructions.split('. ').filter(Boolean)" :key="index">
              {{ step }}.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeViewPage",
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    const recipeId = this.$route.params.recipeId;
    const source = this.$route.query.source;

    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/" + recipeId, 
        { params: { source }}
      );

      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }

      this.recipe = response.data;
    } catch (error) {
      console.error(error);
      this.$router.replace("/NotFound");
    }
  },
};
</script>

<style scoped>
.recipe-image {
  width: 50%;
  display: block;
  margin: 0 auto;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.wrapped {
  flex: 1;
}
</style>
