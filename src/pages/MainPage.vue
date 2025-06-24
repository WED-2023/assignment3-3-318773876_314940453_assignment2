<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="row">
      <div class="col-md-6">
        <RecipePreviewList
          title="Explore these recipes"
          :recipes="randomRecipes"
          class="RandomRecipes center"
        />

        <div class="text-center mt-3">
          <button class="btn btn-primary" @click="loadRandomRecipes">Load New</button>
        </div>
      </div>

      <div class="col-md-6">

      <RecipePreviewList
        title="Last watched recipes"
        :recipes="viewedRecipes"
        :class="{
          RandomRecipes: true,
          blur: !store.username,
          center: true
        }"
      />
      <div v-if="!store.username" class="text-center mt-4">
      <router-link :to="{ name: 'login' }">
        <button class="btn btn-primary">You need to Login to view this</button>
      </router-link>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref, onMounted } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;

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

    onMounted(async () => {
      await loadRandomRecipes();

      if (store.username) {
        try {
          const res = await window.axios.get('/user/recent');
          viewedRecipes.value = res.data;
        } catch (err) {
          console.error("Failed to load recent recipes", err);
        }
      }
    });

    return { store, randomRecipes, viewedRecipes, loadRandomRecipes };
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
