<template>
  <div class="card h-100">
    <!-- Photo -->

    <router-link :to="`/recipe/${recipe.id}?source=${recipe.source}`">
      <img
        v-if="recipe.image"
        :src="recipe.image"
        class="card-img-top recipe-image"
        alt="recipe image"
      />
    </router-link>

    <!-- body -->
    <div class="card-body text-center">
      <!-- name -->
      <h5 class="card-title">{{ recipe.title }}</h5>

      <!-- time -->
      <p class="card-text">
        <strong> time in minutes: </strong>
        {{ recipe.prep_time_minutes || recipe.readyInMinutes }} min
      </p>

      <!-- tags -->
      <p class="card-text">
        <strong> tags: </strong> {{ recipe.tags || "none" }}
      </p>

      <!-- gluten -->
      <p class="card-text" v-if="recipe.has_gluten !== undefined">
        <strong>gluten:</strong> {{ recipe.has_gluten === true ? 'contains' : recipe.has_gluten === false ? 'gluten-free' : '—' }}
      </p>

      <!-- viewed indication -->
      <p class="card-text">
        <strong>viewed:</strong> {{ recipe.was_viewed ? "✔" : "—" }}
      </p>

      <!-- favorite indication -->
      <p class="card-text">
        <strong>favorite:</strong> {{ recipe.is_favorite ? "★" : "—" }}
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-image:hover {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>