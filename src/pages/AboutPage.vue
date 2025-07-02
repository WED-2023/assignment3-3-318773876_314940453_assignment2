<template>
  <div class="about-container">
    <h1 class="title">About Our Project</h1>

    <p>
      This web application was developed as part of the web development environments course.<br />
      The goal of the project is to provide users with a platform to explore, save, and manage recipes - 
      both from external sources and personal creations.
    </p>

    <p>
      The system supports features such as user authentication, favorite recipes, recently viewed recipes, family recipes,
      and personal recipe creation with images and preparation steps.
    </p>

    <h2>Development Team</h2>
    <ul>
      <li>Noa Ioshpe</li>
      <li>Noa Revivo</li>
    </ul>

    <h2>Project Repositories</h2>
    <p>
      <a href="https://github.com/WED-2023/assignment3-2-318773876_314940453_assignment2" target="_blank">GitHub Repository Part 3-2 Backend</a>
    </p>
    <p>
      <a href="https://github.com/WED-2023/assignment3-3-318773876_314940453_assignment2.git" target="_blank">GitHub Repository Part 3-3 Frontend</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  text-align: center;
}
</style>
