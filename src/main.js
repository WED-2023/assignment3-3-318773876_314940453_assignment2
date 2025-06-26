import { createApp, ref } from 'vue';
import App from './App.vue';
import routes from './router/index';
import axios from 'axios';

window.axios = axios;
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

import VueAxios from 'vue-axios';
import { createRouter, createWebHistory } from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// BootstrapVue 3
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import { BContainer, BRow, BCol } from 'bootstrap-vue-3';
import Vuelidate from '@vuelidate/core';


// Router setup
const router = createRouter({
  history: createWebHistory(),
  routes
});

const username = ref(localStorage.getItem('username'));

// Shared store
const store = {
  username,
  server_domain: 'http://localhost:3000',
  login(usernameVal) {
    localStorage.setItem('username', usernameVal);
    username.value = usernameVal;
    console.log('login', username.value);
  },
  logout() {
    console.log('logout');
    localStorage.removeItem('username');
    username.value = null;
  },
};

// Axios interceptors
axios.interceptors.request.use((config) => config, (error) => Promise.reject(error));
axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

// Create app
const app = createApp(App);

// Plugins
app.use(router);
app.use(VueAxios, axios);
app.use(BootstrapVue3);
app.use(Vuelidate); 

// Register global BootstrapVue3 components
app.component('BContainer', BContainer);
app.component('BRow', BRow);
app.component('BCol', BCol);

window.store = store;
// Global store
app.config.globalProperties.store = store;

// Global toast function
app.config.globalProperties.toast = (title, message, variant = 'primary') => {
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${variant} border-0 show`;
  toast.style.position = 'fixed';
  toast.style.top = '1rem';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.minWidth = '250px';
  toast.style.zIndex = 1055;

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <strong>${title}</strong><br>${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  document.body.appendChild(toast);

  // מאפשר סגירה בלחיצה
  toast.querySelector('.btn-close').onclick = () => toast.remove();

  // הסרה אוטומטית אחרי 3 שניות
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Mount app
app.mount('#app');
app.provide('store', store);