<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions('settings', ['loadSettings']),
      ...mapActions('users', ['authStateChange']),
    },
    mounted() {
      //setup link for Electron menu
      if ( this.$q.platform.is.electron ) {
        window.ipcRenderer.on('show-settings', () => {
          this.$router.push({ name: 'Settings' });
        });
      }
      this.loadSettings();
      this.authStateChange();
    },
  };
</script>

<style></style>
