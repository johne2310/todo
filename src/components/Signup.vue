<!-- add new task dialog -->
<!--suppress ALL -->
<q-dialog v-model="addNewTask" no-backdrop-dismiss>
  <q-form @submit.prevent="signup" v-model="valid" ref="form">
    <q-card class="mx-auto mt-5" style="width: 500px">
      <q-card-section class="primary darken-2 white--text my-4">
        <h1 class="display-1">Sign up</h1>
      </q-card-section>
      <q-card-section>
        <q-input v-model="email" filled type="email" hint="Email"/>

        <q-input ref="email" hint="email" v-model="email">
          <template v-slot:prepend>
            <q-icon name="email" color="primary"/>
          </template>
        </q-input>


        <q-input
          ref="password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          :rules="[rules.required]"
          label="Password"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-lock" color="primary"/>
          </template>
          <template v-slot:append @click="togglePassword">
            <q-icon
              :name="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              color="primary"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
        <q-input
          :type="showPassword ? 'text' : 'password'"
          v-model="confirmPassword"
          :rules="[rules.required, comparePasswords]"
          label="Confirm Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </q-card-section>
      <q-separator/>
      <q-card-actions class="pa-5">
        <q-space/>
        <q-btn
          :disabled="!valid"
          color="info"
          type="submit"
          :loading="loading"
        >Sign up
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-form>
</q-dialog>
