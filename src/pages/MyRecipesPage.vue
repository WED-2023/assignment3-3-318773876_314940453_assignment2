<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <RecipePreviewList
      :recipes="myRecipes"
      title="Recipes I created"
      :clickable="true"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';

export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const myRecipes = ref([]);

    const loadMyRecipes = async () => {
      try {
        const res = await window.axios.get('/user/recipes');
        myRecipes.value = res.data.recipes;
      } catch (err) {
        console.error('Failed to load my recipes:', err);
      }
    };

    onMounted(() => {
      loadMyRecipes();
    });

    return {
      myRecipes
    };
  }
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
