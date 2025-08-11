<template>
  <div class="page-bg">
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
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.page-bg{
  /* התאימי אם צריך: גובה הניווט ~56–64px */
  min-height: calc(100vh - 64px);
  padding: 24px 0 64px;

  background:
    radial-gradient(900px 220px at 50% 0, rgba(124,58,237,.25), rgba(124,58,237,0) 70%),
    linear-gradient(180deg, #ede9fe 0%, #f5f3ff 45%, #ffffff 85%);
}

.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 28px;
  font-family: 'Heebo', -apple-system, system-ui, sans-serif;
  color: #0f172a;
  line-height: 1.75;

  background: rgba(255,255,255,.75);
  backdrop-filter: saturate(1.1) blur(6px);
  border: 1px solid rgba(124,58,237,.14);
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(124,58,237,.08);
}

/* כותרת ראשית */
.title {
  text-align: center;
  font-weight: 800;
  font-size: clamp(28px, 3.6vw, 40px);
  letter-spacing: .3px;
  margin: 0 0 18px;
  color: #0f172a;
}
.title::after {
  content: "";
  display: block;
  width: 84px;
  height: 6px;
  margin: 10px auto 0;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(109, 80, 255, .18), rgba(109, 80, 255, 0));
  opacity: .9;
}

/* פסקאות */
.about-container p {
  margin: .8rem 0;
  font-size: 1.03rem;
  color: #0f172a;
}
.about-container p:first-of-type {
  color: #475569; /* פתיח מעט רך יותר */
}

/* כותרות משניות */
.about-container h2 {
  font-weight: 700;
  font-size: 1.35rem;
  margin: 1.5rem 0 .75rem;
  color: #0f172a;
}

/* רשימה עם נקודות יפות */
.about-container ul {
  list-style: none;
  padding: 0;
  margin: .25rem 0 1rem;
}
.about-container li {
  position: relative;
  padding-left: 1.15rem;
  margin: .35rem 0;
}
.about-container li::before {
  content: "•";
  position: absolute;
  left: 0; top: 0;
  color: #7c3aed;
  font-weight: 900;
}

/* קישורים – הובר ממלא רקע סגול */
.about-container a {
  color: #7c3aed;
  text-decoration: none;
  font-weight: 650;
  border-bottom: 2px solid transparent;
  border-radius: 10px;
  padding: 2px 6px;
  transition: color .18s, background-color .18s, border-color .18s, transform .18s;
}
.about-container a:hover {
  color: #fff;
  background: #6d28d9;
  border-color: #6d28d9;
  transform: translateY(-1px);
}

/* רספונסיביות קלה */
@media (max-width: 600px) {
  .about-container { padding: 20px 16px; }
}
</style>
