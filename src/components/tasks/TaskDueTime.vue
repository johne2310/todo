<template>
  <q-input
    ref="dueTime"
    class="col"
    :disable="isDateSet"
    outlined
    :value="taskDueTime"
    :rules="[rules.required]"
    hint="Due time"
    clearable
    @input="$emit('update:taskDueTime', $event)"
  >
    <template v-slot:prepend>
      <q-icon name="mdi-clock-outline" class="cursor-pointer" color="primary">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            sanitize
            :value="taskDueTime"
            @input="$emit('update:taskDueTime', $event)"
            :mask="timeFormat"
          >
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="OK" color="primary" v-close-popup/>
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    props: ['taskDueTime', 'isDateSet'],
    data() {
      return {
        rules: {
          required: val => !!val || 'This field is required.',
          time: val =>
            /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(val) ||
            'Please enter a valid time',
        },
      };
    },
    methods: {
      validateTime() {
        return this.$refs.dueTime.validate(); //call input validation here so result can be available to parent
      },
    },
    computed: {
      ...mapGetters('settings', ['settings']),
      timeFormat() {
        //set the q-time mask based on settings
        if ( this.settings.show12HourFormat ) {
          return 'hh:mma';
        } else {
          return 'HH:mm';
        }
      },
    },
  };
</script>

<style scoped></style>
