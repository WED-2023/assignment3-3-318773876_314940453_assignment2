<template>
  <div class="search-page">
    <h1 class="page-title"> 📖 Search Recipes </h1>

    <div class="search-card">
      <!-- form -->
      <form @submit.prevent="searchRecipes" class="search-form">
        <!-- Query -->
        <div class="form-group">
          <label>🔎 Search Query</label>
          <input v-model="query" type="text" class="form-input" required />
        </div>

        <!-- Cuisine -->
        <div class="form-group">
          <label>🍲 Cuisine</label>
          <select v-model="cuisine" class="form-input">
            <option value="">-- Any --</option>
            <option v-for="c in cuisines" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <!-- Diet -->
        <div class="form-group">
          <label>🥗 Diet</label>
          <select v-model="diet" class="form-input">
            <option value="">-- Any --</option>
            <option v-for="d in diets" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>

        <!-- Intolerances -->
        <div class="form-group">
          <label>⚠ Intolerances</label>
          <select v-model="intolerances" multiple class="form-input">
            <option v-for="i in intolerancesOptions" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>

        <!-- Number of Results -->
        <div class="form-group">
          <label>🔢 Number of Results</label>
          <select v-model="number" class="form-input">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <button type="submit" class="btn-search">🔍 Search</button>
      </form>

      <!-- chef image -->
      <div class="chef-image">
        <img src="@/assets/chef.jpg" alt="Chef" />
      </div>
    </div>

    <!-- results -->
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
  components: { RecipePreviewList },
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

        // ✅ מוסיפים לכל מתכון source = 'external'
        recipes.value = res.data.recipes.map(r => ({
          ...r,
          source: 'external'
        }));

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
.search-page {
  min-height: 100vh;
  padding: 30px 15px;
  font-family: 'Poppins','Assistant',sans-serif;
}

.page-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #4b0082;
  margin-bottom: 25px;
  letter-spacing: 1px;
}

.search-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 1000px;
  margin: auto;
  padding: 25px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: start;
  gap: 30px;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #4b0082;
}

.form-input {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
}

.btn-search {
  margin-top: 15px;
  background: #4b0082;  /* סגול */
  color: white;         /* טקסט לבן */
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.btn-search:hover {
  background: #370060;  /* סגול כהה יותר */
  transform: scale(1.05);
}

.chef-image {
  display: flex;
  align-items: center;
  justify-content: center;
}
.chef-image img {
  max-height: 220px;
  object-fit: contain;
}

/* mobile */
@media (max-width: 768px) {
  .search-card {
    grid-template-columns: 1fr;
  }
}
</style>