
<template>
  <div class="container mt-4" style="max-width: 400px;">
    <h2 class="mb-4">Login</h2>
    <b-form @submit.prevent="login">
      <!-- Username -->
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="state.username"
          :state="getValidationState(v$.username)"
          @blur="v$.username.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.username.$error">
          <div v-if="!v$.username.required">Username is required.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="state.password"
          :state="getValidationState(v$.password)"
          @blur="v$.password.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.password.$error">
          <div v-if="!v$.password.required">Password is required.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100">Login</b-button>

      <b-alert
        variant="danger"
        class="mt-3"
        dismissible
        v-if="state.submitError"
        show
      >
        Login failed: {{ state.submitError }}
      </b-alert>

      <div class="mt-2">
        Don’t have an account?
        <router-link to="/register">Register here</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import axios from 'axios';


export default {
  name: 'LoginPage',
  setup() {
    const instance = getCurrentInstance();
    const store = instance.appContext.config.globalProperties.store;
    const toast = instance.appContext.config.globalProperties.toast;
    const router = instance.appContext.config.globalProperties.$router;
    
    const state = reactive({
      username: '',
      password: '',
      submitError: null,
    });

    const rules = {
      username: { required },
      password: { required },
    };

    const v$ = useVuelidate(rules, state);

    const getValidationState = (field) => {
      return field.$dirty ? !field.$invalid : null;
    };

    const login = async () => {
      v$.value.$touch();
      const valid = await v$.value.$validate();

      if (!valid) {
        return;
      }

      try {
        await axios.post('/login', {
          username: state.username,
          password: state.password,
        });

        store.login(state.username);

        toast('Login successful', 'Welcome back!', 'success');
        router.replace('/');

      } catch (err) {
        state.submitError = err.response?.data?.message || 'Unexpected error.';
      }
    };

    return { state, v$, login, getValidationState };
  },
};
</script>