<!--suppress ALL -->

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          Awesome Todo
        </q-toolbar-title>
        <q-space/>

        <q-btn
          v-if="!isLoggedIn"
          :to="{ name: 'Login' }"
          flat
          color="white"
          icon-right="mdi-login"
          label="Login"
        />
        <div v-if="isLoggedIn">
          <q-btn
            flat
            color="white"
            icon-right="mdi-logout"
            :label="label"
            @click="logoutUser"
          />
        </div>

        <div></div>
      </q-toolbar>
    </q-header>

    <!-- TODO: replace class with platform.has.touch -->
    <!-- v-if="$q.platform.has.touch" -->
    <q-footer>
      <q-tabs inline-label class="primary text-white shadow-2">
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          :icon="link.icon"
          :to="link.path"
          :label="link.title"
          exact
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="767"
      show-if-above
      :width="230"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-blue-grey-2"
    >
      <q-list separator>
        <q-item-label header class="text-grey-10">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

        <!--        SHow quit button if an electron app-->
        <q-item
          clickable
          v-if="this.$q.platform.is.electron"
          class="text-blue-grey-8 absolute-bottom"
          @click="quitApp"
        >
          <q-item-section avatar>
            <q-icon name="mdi-power"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue-grey-8">Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import EssentialLink from 'components/EssentialLink';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'MainLayout',

    components: {
      EssentialLink,
    },

    data() {
      return {
        leftDrawerOpen: false,
        essentialLinks: [
          {
            title: 'Todos',
            caption: 'View Todos',
            icon: 'list',
            path: { name: 'Home' },
          },
          {
            title: 'Settings',
            caption: 'Edit App Settings',
            icon: 'settings',
            path: { name: 'Settings' },
          },
        ],
      };
    },
    methods: {
      ...mapActions('users', ['logoutUser']),
      quitApp() {
        if ( this.$q.platform.is.electron ) {
          window.ipcRenderer.send('quit-app');
        }
      },
    },
    computed: {
      ...mapGetters('users', ['isLoggedIn', 'user']),
      label() {
        if ( this.$q.screen.xs ) {
          return '';
        } else {
          return 'Log out';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }

  /*.q-footer {*/
  /*  z-index: 1;*/
  /*}*/

  .q-drawer .q-router-link--exact-active {
    color: rgb(13, 6, 56) !important;
  }

  .left50 {
    margin-left: 200px;
  }
</style>
