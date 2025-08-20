<template>
  <div class="container">
    <h3>{{ title }}</h3>

    <div class="recipe-grid">
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview :recipe="r" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
    clickable: {
    type: Boolean,
    default: true,
    }
  },
};
//   data() {
//     return {
//       recipes: [],
//     };
//   },
//   mounted() {
//     this.updateRecipes();
//   },
//   methods: {
//     async updateRecipes() {
//       try {
//         const response = await this.axios.get(
//           this.$root.store.server_domain + "/recipes/3random"
//         );
//         const recipes = response.data.recipes;
//         this.recipes = [];
//         this.recipes.push(...recipes);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
// };
// </script>

<style scoped>
.container {
  min-height: 400px;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

</style>
