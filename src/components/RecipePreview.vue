<template>
  <div class="card h-100 recipe-card">
    <!-- Photo with link -->
    <div class="text-center">
      <router-link
        :to="`/recipe/${localRecipe.id}?source=${localRecipe.source}`"
        class="d-inline-block"
      >
        <img
          v-if="localRecipe.image"
          :src="localRecipe.image"
          class="card-img-top recipe-image"
          alt="recipe image"
        />
      </router-link>
    </div>

    <!-- body -->
    <div class="card-body text-center">
      <!-- name -->
      <h5 class="card-title">{{ localRecipe.title }}</h5>

      <!-- time -->
      <p class="card-text">
        <strong>time in minutes:</strong>
        {{ localRecipe.prep_time_minutes || localRecipe.readyInMinutes }} min
      </p>

      <!-- tags -->
      <p class="card-text">
        <strong>tags:</strong> {{ localRecipe.tags || "none" }}
      </p>

      <!-- gluten -->
      <p class="card-text" v-if="localRecipe.has_gluten !== undefined">
        <strong>gluten:</strong>
        {{ localRecipe.has_gluten === true ? "contains" : localRecipe.has_gluten === false ? "gluten-free" : "—" }}
      </p>

      <!-- viewed indication -->
      <p class="card-text">
        <strong>viewed:</strong> {{ localRecipe.was_viewed ? "✔" : "—" }}
      </p>

      <!-- favorite with toggle button -->
      <p class="card-text d-flex align-items-center justify-content-center gap-2">
        <strong>favorite:</strong>
        <button
          class="btn p-0 border-0 bg-transparent"
          @click.stop="toggleFavorite"
          title="Toggle Favorite"
        >
          <span style="font-size: 20px;">
            {{ localRecipe.is_favorite ? "♥" : "♡" }}
          </span>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
//import { store } from "@/store";
import { inject } from 'vue';

export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const localRecipe = ref({ ...props.recipe });
    const store = inject('store');

    watch(
      () => props.recipe,
      (newRecipe) => {
        localRecipe.value = { ...newRecipe };
      },
      { deep: true }
    );

    const toggleFavorite = async () => {
      if (!store?.username?.value) {
        alert("You must be logged in to add favorites.");
        return;
      }
      try {
        if (!localRecipe.value.is_favorite) {
          await window.axios.post("/user/favorites", {
            recipeId: localRecipe.value.id
          });
          localRecipe.value.is_favorite = true;
        } else {
          alert("Already in favorites.");
        }
      } catch (err) {
        console.error("Failed to mark as favorite:", err);
        alert("Failed to save recipe as favorite.");
      }
    };

    return {
      localRecipe,
      toggleFavorite
    };
  }
};
</script>

<style scoped>
.recipe-card {
  max-width: 500px;
  margin: 0 auto 20px;
  padding: 10px;
  border-radius: 12px;
}

.recipe-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin: 10px auto;
  display: block;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-image:hover {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
