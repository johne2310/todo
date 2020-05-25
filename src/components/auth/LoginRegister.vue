<!--suppress ALL -->

<template>
  <div>
    <q-banner
      v-if="error"
      inline-actions
      dense
      rounded
      class="bg-red text-white"
    >
      {{ error }}
      <template v-slot:action>
        <q-btn flat label="Dismiss" @click="dismissAlert"/>
      </template>
    </q-banner>

    <q-form ref="form" @submit.prevent="submitUser">
      <div class="row q-mb-md">
        <q-banner
          v-if="!error"
          :class="{ register: tab === 'register', login: tab === 'login' }"
          class="col "
        >
          <template v-slot:avatar>
            <q-icon name="mdi-account-circle-outline" color="primary"/>
          </template>
          {{ tab | titleCase }} here to access your Awesome Todos anywhere
        </q-banner>
      </div>

      <div class="row q-mb-sm">
        <q-input
          sanitize
          type="email"
          ref="email"
          v-model.trim="credentials.email"
          class="col"
          label="Email"
          :rules="[rules.required, rules.email]"
          autofocus
          lazy-rules
          outlined
          hint="Enter a valid email address"
        >
        </q-input>
      </div>

      <div class="row q-mb-sm">
        <q-input
          sanitize
          ref="password"
          class="col"
          outlined
          :type="showPassword ? 'text' : 'password'"
          v-model.trim="credentials.password"
          :rules="[rules.minLength]"
          lazy-rules
          label="Password"
          hint="Password must contain six characters"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              color="primary"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>
      <div class="row">
        <q-space/>
        <q-btn
          :disable="setValid()"
          :loading="loading"
          type="submit"
          color="primary"
          :label="tab"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: ['tab'],
    data() {
      return {
        valid: false,
        showPassword: false,
        mounted: false,
        credentials: {
          email: '',
          password: '',
        },
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        rules: {
          required: val => !!val || 'Enter a valid email address',
          email: val =>
            this.reg.test(val.toLowerCase()) ||
            'A valid email address is required',
          minLength: val =>
            val.length >= 6 || 'Password must contain six characters',
        },
      };
    },

    methods: {
      ...mapActions('users', ['registerUser', 'loginUser']),
      dismissAlert() {
        this.$store.commit('users/setError', null);
      },
      submitUser() {
        if ( this.tab === 'register' ) {
          this.$refs.form
            .validate()
            .then(() => {
              this.registerUser(this.credentials);
            })
            .catch(error => {
            });
        } else {
          this.$refs.form
            .validate()
            .then(() => {
              this.loginUser(this.credentials);
            })
            .catch(error => {
            });
        }
      },
      setValid() {
        //  regulate disable on submit button
        // check to see if component is mounted (else $refs will not be available)
        if ( this.mounted ) {
          return (
            this.$refs.email.hasError ||
            !this.$refs.email.hasValue ||
            this.$refs.password.hasError ||
            this.$refs.password.innerValue.length < 6
          );
        }
      },
    },
    computed: {
      ...mapGetters('users', ['error', 'loading']),
    },
    mounted() {
      this.mounted = true;
    },
    filters: {
      titleCase(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
  };
</script>

<style scoped>
  .register {
    background-color: #eee !important;
  }

  .login {
    background-color: #e1f5fe !important;
  }
</style>
