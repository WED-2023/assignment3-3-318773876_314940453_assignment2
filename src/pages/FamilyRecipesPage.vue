<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>

    <div v-if="familyRecipes.length === 0">
      <p class="text-center">You have no family recipes yet.</p>
    </div>
    
    <div v-else>
      <div
        v-for="r in familyRecipes"
        :key="r.recipe_id"
        class="card recipe-container mx-auto mb-4"
      >
        <img
          :src="r.image_url"
          alt="recipe image"
          class="recipe-image"
          @error="e => e.target.src = 'https://via.placeholder.com/200?text=No+Image'"
        />
        <div class="card-body text-center">
          <h5 class="card-title">{{ r.recipe_name }}</h5>
          <p><strong>When prepared:</strong> {{ r.when_prepared }}</p>
          <p><strong>Ingredients:</strong> {{ r.ingredients }}</p>
          <p><strong>Preparation method:</strong> {{ r.preparation_method }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'MyFamilyRecipesPage',
  setup() {
    const familyRecipes = ref([]);

    const loadFamilyRecipes = async () => {
      try {
        const res = await window.axios.get('/user/family');
        familyRecipes.value = res.data.recipes;
      } catch (err) {
        console.error('❌ Failed to load family recipes:', err);
      }
    };

    onMounted(() => {
      loadFamilyRecipes();
    });

    return {
      familyRecipes
    };
  }
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  max-width: 90%;
  margin: 0 auto;
  padding: 15px;
}

.recipe-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.card-body {
  text-align: center;
}
</style>
