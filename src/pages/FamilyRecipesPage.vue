<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>

    <div v-if="familyRecipes.length === 0">
      <p class="text-center">עדיין אין מתכונים משפחתיים.</p>
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
        <div class="card-body">
          <h5 class="card-title text-center">{{ r.recipe_name }}</h5>
          <p class="rtl"><strong>מתי מכינים:</strong> {{ r.when_prepared }}</p>
          <!-- מרכיבים -->
          <div class="mt-3 rtl">
            <strong>מרכיבים:</strong>
            <ul class="ing-list">
              <li v-for="(ing, i) in parseIngredients(r.ingredients)" :key="i">
                <span class="ing-name">{{ ing.name }}</span>
                <span v-if="ing.amount" class="sep"> — </span>
                <span class="ing-amount" v-if="ing.amount">{{ ing.amount }}</span>
              </li>
            </ul>
          </div>
          <p class="rtl mt-3"><strong>אופן הכנה:</strong> {{ r.preparation_method }}</p>
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

    const parseIngredients = (text = '') => {
      return text
        .split(',')                 // פיצול לפי פסיקים
        .map(s => s.trim())
        .filter(Boolean)
        .map(item => {
          // "שם (כמות)"
          const m = item.match(/^(.*?)\s*\((.*?)\)\s*$/);
          return m ? { name: m[1], amount: m[2] }   // יש כמות
                  : { name: item, amount: '' };    // אין כמות
        });
    };
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
      familyRecipes,
      parseIngredients
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

.rtl {
  direction: rtl;
  text-align: right;
}

/* רשימת מרכיבים - תבליטים בצד ימין */
.ing-list {
  margin: .35rem 0 0;
  padding-right: 1.2rem; /* תן מקום לתבליט בצד ימין */
  padding-left: 0;
  list-style: disc;
  list-style-position: outside;
}

.ing-list li { margin: .25rem 0; line-height: 1.5; }
.ing-name { font-weight: 600; }
.sep { margin: 0 .3rem; opacity: .8; }        /* ריווח סביב המקף */
.ing-amount { color: #444; }

/* קוסמטיקה כללית ל־card */
.recipe-container {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
  max-width: 640px;
}

.recipe-image {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
}

</style>
