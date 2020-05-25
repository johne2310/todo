<template>
  <q-page class="q-pa-md">
    <q-list bordered separator
    >
      <q-item-label class="bg-blue-3 text-grey-10" header
      >Formatting
      </q-item-label
      >

      <!-- Toggle 12 hour time format -->
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 Hour Time Format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="primary" v-model="show12HourFormat"/>
        </q-item-section>
      </q-item>

      <!-- one list toggle -->
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show All Items in One List</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="info" v-model="showOneList"/>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered separator class="q-mt-sm "
    >
      <q-item-label class="bg-cyan-3 text-grey-10" header>More</q-item-label>

      <!-- Toggle 12 hour time format -->
      <q-item tag="label" v-ripple :to="{ name: 'Help' }">
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-chevron-right" color="grey-6"/>
        </q-item-section>
      </q-item>

      <!-- one list toggle -->
      <q-item tag="label" v-ripple>
        <q-item-section @click="visitWebsite">
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-chevron-right" color="grey-6"/>
        </q-item-section>
      </q-item>
      <!-- email -->
      <q-item tag="label" v-ripple>
        <q-item-section @click="sendEmail">
          <q-item-label>Email Us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-email-send-outline" color="grey-6"/>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-pl-sm q-pt-md right">
      <span>Version: {{ version }}</span>
    </div>
  </q-page>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { version } from '../../package.json';

  import { openURL } from 'quasar';

  export default {
    data() {
      return {
        // showOneList: false,
        version: version,
      };
    },
    methods: {
      ...mapActions('settings', ['setTimeFormat', 'setListFormat']),
      // toggleTimeFormat() {
      // this.timeFormat = !this.timeFormat;
      // },
      visitWebsite() {
        openURL('http://www.day41.com.au');
      },
      sendEmail() {
        window.location.href =
          'mailto:johne2310@gmail.com?subject=Awesome Todo Feedback';
      },
    },
    computed: {
      // ...mapGetters(['settings']),
      ...mapGetters('settings', ['settings']),
      show12HourFormat: {
        get() {
          return this.settings.show12HourFormat;
        },
        set(value) {
          this.setTimeFormat(value);
        },
      },
      showOneList: {
        get() {
          return this.settings.showOneList;
        },
        set(value) {
          this.setListFormat(value);
        },
      },
    },
  };
</script>

<style>
  .right {
    text-align: right;
  }
</style>
