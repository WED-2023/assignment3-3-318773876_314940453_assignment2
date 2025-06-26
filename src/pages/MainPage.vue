<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="row">
      <!-- Left: Random recipes -->
      <div class="col-md-6">
        <RecipePreviewList
          title="Explore these recipes"
          :recipes="randomRecipes"
        />

        <div class="text-center mt-3">
          <button class="btn btn-primary" @click="loadRandomRecipes">Load New</button>
        </div>
      </div>

      <!-- Right: LoginForm or ViewedRecipes -->
      <div class="col-md-6">
        <LoginForm
          v-if="!store?.username?.value"
          @logged-in="loadViewedRecipes"
        />
        <RecipePreviewList
          v-else
          title="Last watched recipes"
          :recipes="viewedRecipes"
        />
      </div>
    </div>
  </div>
      
</template>

<script>
import { ref, onMounted, watch, inject } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    RecipePreviewList,
    LoginForm
  },
  setup() {
    const store = inject('store');
    
    const randomRecipes = ref([]);
    const viewedRecipes = ref([]);

    const loadRandomRecipes = async () => {
      try {
        const res = await window.axios.get('/recipes/3random');
        randomRecipes.value = res.data.recipes;
      } catch (err) {
        console.error("Failed to load random recipes", err);
      }
    };

    const loadViewedRecipes = async () => {
      try {
        console.log("🔁 Requesting viewed recipes...");
        const res = await window.axios.get('/user/recent');
        console.log("✅ Got viewed recipes:", res.data);
        viewedRecipes.value = res.data;
      } catch (err) {
        console.error('Failed to load viewed recipes', err);
      }
    };


    onMounted(async () => {
      console.log("username:", store?.username?.value);

      await loadRandomRecipes();
      if (store?.username?.value) {
        await loadViewedRecipes();
      }
    });
    
    if (store?.username) {
      watch(
        () => store.username.value,
        async (newUsername) => {
          if (newUsername) {
            await loadViewedRecipes();
          } else {
            viewedRecipes.value = [];
          }
        }
      );
    }

    return { store, randomRecipes, viewedRecipes, loadRandomRecipes, loadViewedRecipes };
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>