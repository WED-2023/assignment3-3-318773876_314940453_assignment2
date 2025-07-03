<template>
  <div class="container">
    <h1 class="text-center my-4">Search Recipes</h1>

    <!-- search form -->
    <form @submit.prevent="searchRecipes" class="mb-4">
      <div class="mb-3">
        <label class="form-label">Search Query</label>
        <input v-model="query" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Cuisine</label>
        <select v-model="cuisine" class="form-select">
          <option value="">-- Any --</option>
          <option v-for="c in cuisines" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Diet</label>
        <select v-model="diet" class="form-select">
          <option value="">-- Any --</option>
          <option v-for="d in diets" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Intolerances</label>
        <select v-model="intolerances" multiple class="form-select">
          <option v-for="i in intolerancesOptions" :key="i" :value="i">{{ i }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Number of Results</label>
        <select v-model="number" class="form-select">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <!-- תוצאות -->
    <div v-if="recipes.length > 0">
      <RecipePreviewList :recipes="recipes" title="Search Results" :clickable="true" />
    </div>
    <div v-else-if="searched">
      <p>No results found.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import RecipePreviewList from '@/components/RecipePreviewList.vue';

export default {
  name: 'SearchPage',
  components: {
    RecipePreviewList
  },
  setup() {
    const query = ref('');
    const cuisine = ref('');
    const diet = ref('');
    const intolerances = ref([]);
    const number = ref(5);
    const searched = ref(false);
    const recipes = ref([]);

    const cuisines = [
      "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese",
      "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish",
      "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean",
      "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
    ];

    const diets = [
      "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian",
      "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"
    ];

    const intolerancesOptions = [
      "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish",
      "Soy", "Sulfite", "Tree Nut", "Wheat"
    ];

    const searchRecipes = async () => {
      try {
        const res = await window.axios.get('/recipes/search', {
          params: {
            query: query.value,
            cuisine: cuisine.value,
            diet: diet.value,
            intolerances: intolerances.value,
            number: number.value
          }
        });
        recipes.value = res.data.recipes;
      } catch (err) {
        recipes.value = [];
        console.error(err);
      } finally {
        searched.value = true;
      }
    };

    return {
      query, cuisine, diet, intolerances, number,
      searched, recipes,
      cuisines, diets, intolerancesOptions,
      searchRecipes
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
