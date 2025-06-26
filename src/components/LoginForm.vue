<template>
  <div>
    <h3 class="mb-3">Sign In</h3>
    <b-form @submit.prevent="login">
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

      <b-form-checkbox v-model="rememberMe" class="mb-2">
        Remember me
      </b-form-checkbox>

      <b-button type="submit" variant="primary" class="w-100">Submit</b-button>

      <b-alert
        variant="danger"
        class="mt-3"
        dismissible
        v-if="state.submitError"
        show
      >
        Login failed: {{ state.submitError }}
      </b-alert>

      <div class="mt-2 text-end">
        <a href="#">Forgot <u>password?</u></a>
      </div>
    </b-form>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  name: 'LoginForm',
  setup(_, { emit }) {
    const instance = getCurrentInstance();
    const store = instance.appContext.config.globalProperties.store;
    const toast = instance.appContext.config.globalProperties.toast;

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
      if (!valid) return;

      try {
        await window.axios.post('/login', {
          username: state.username,
          password: state.password,
        });
        store.login(state.username);
        emit('logged-in');
        toast('Login successful', 'Welcome back!', 'success');
      } catch (err) {
        state.submitError = err.response?.data?.message || 'Unexpected error.';
      }
    };

    return {
      state,
      v$,
      login,
      getValidationState,
      rememberMe: false
    };
  },
};
</script>
