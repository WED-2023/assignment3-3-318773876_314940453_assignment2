<template>
  <div class="container mt-4" style="max-width: 500px;">
    <h2 class="mb-4">Register</h2>
    <b-form @submit.prevent="register">
      <!-- Username -->
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="state.username"
          :state="!v$.username.$invalid || !v$.username.$dirty ? null : false"
          @blur="v$.username.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.username.$error">
          <div v-if="!v$.username.required">Username is required.</div>
          <div v-else-if="!v$.username.minLength">Username must be at least 3 characters.</div>
          <div v-else-if="!v$.username.maxLength">Username must be no more than 8 characters.</div>
          <div v-else-if="!v$.username.alpha">Username must contain only letters (a–z).</div>
          <div v-else>Invalid username.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name -->
      <b-form-group label="First Name" label-for="first_name">
        <b-form-input
          id="first_name"
          v-model="state.first_name"
          :state="!v$.first_name.$invalid || !v$.first_name.$dirty ? null : false"
          @blur="v$.first_name.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.first_name.$error">
          First name is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last Name -->
      <b-form-group label="Last Name" label-for="last_name">
        <b-form-input
          id="last_name"
          v-model="state.last_name"
          :state="!v$.last_name.$invalid || !v$.last_name.$dirty ? null : false"
          @blur="v$.last_name.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.last_name.$error">
          Last name is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country -->
      <b-form-group label="Country" label-for="country">
        <b-form-select
          id="country"
          v-model="state.country"
          :options="countries"
          :state="!v$.country.$invalid || !v$.country.$dirty ? null : false"
          @change="v$.country.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.country.$error">
          Country is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="state.password"
          :state="!v$.password.$invalid || !v$.password.$dirty ? null : false"
          @blur="v$.password.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.password.$error">
          <div v-if="!v$.password.required">Password is required.</div>
          <div v-else-if="!v$.password.minLength">Password must be at least 5 characters.</div>
          <div v-else-if="!v$.password.maxLength">Password must be no more than 10 characters.</div>
          <div v-else>Invalid password.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password -->
      <b-form-group label="Confirm Password" label-for="confirmedPassword">
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="state.password_confirm"
          :state="!v$.password_confirm.$invalid || !v$.password_confirm.$dirty ? null : false"
          @blur="v$.password_confirm.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.password_confirm.$error">
          <div v-if="!v$.password_confirm.required">Confirmation is required.</div>
          <div v-else-if="!v$.password_confirm.sameAsPassword">Passwords do not match.</div>
          <div v-else>Invalid confirmation.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          type="email"
          v-model="state.email"
          :state="!v$.email.$invalid || !v$.email.$dirty ? null : false"
          @blur="v$.email.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.email.$error">
          Valid email is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="success" class="w-100">Register</b-button>

      <b-alert
        variant="danger"
        class="mt-3"
        dismissible
        v-if="state.submitError"
        show
      >
        Registration failed: {{ state.submitError }}
      </b-alert>

      <div class="mt-2">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { computed, reactive, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, email as emailValidator, alpha, sameAs } from '@vuelidate/validators';
import rawCountries from '../assets/countries';

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter();

    const { appContext } = getCurrentInstance();
    const toast = appContext.config.globalProperties.toast;

    const state = reactive({
      username: '',
      first_name: '',
      last_name: '',
      country: '',      
      password: '',
      password_confirm: '',
      email: '',
      submitError: null,
    });

    const submitting = ref(false);
    const passwordComputed = computed(() => state.password);

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha,
      },
      first_name: { required },
      last_name: { required },
      country: { required },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
      },
      password_confirm: {
        required,
        sameAsPassword: sameAs(passwordComputed),
      },
      email: { required, email: emailValidator },
    };

    const v$ = useVuelidate(rules, state);

    const register = async () => {
      v$.value.$touch();
      if (!(await v$.value.$validate()) || submitting.value) return;

      submitting.value = true;
      state.submitError = null;

      try {
        await window.axios.post('/register', {
          username: state.username,
          first_name: state.first_name,
          last_name: state.last_name,
          country: state.country,
          password: state.password,
          password_confirm: state.password_confirm,
          email: state.email,
        });
        //window.toast('Registration successful', 'You can now login', 'success');
        //window.router.push('/login');
        router.push({ name: 'login' });
        toast?.('Registration successful', 'You can now login', 'success');
      } catch (err) {
        const status = err.response?.status;
        if (status === 409) {
          state.submitError = 'Username is already taken.';
        } else {
          state.submitError = err.response?.data?.message || 'Unexpected error.';
        }
      } finally {
        submitting.value = false;
      }
    };

    return {
      state,
      countries: [{ value: '', text: 'Select a country' }, ...rawCountries.map(c => ({ value: c, text: c }))],
      register,
      v$,
      submitting
    };
  },
};
</script>
