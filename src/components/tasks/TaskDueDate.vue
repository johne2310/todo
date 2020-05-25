<template>
  <q-input
    ref="dueDate"
    class="col"
    outlined
    :value="taskDueDate"
    :rules="[rules.required]"
    hint="Due date"
    clearable
    @input="$emit('update:taskDueDate', $event)"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer" color="primary">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            sanitize
            :value="taskDueDate"
            mask="DD/MM/YYYY"
            :options="dateOptions"
            @input="$emit('update:taskDueDate', $event)"
          >
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="OK" color="primary" flat v-close-popup/>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
  export default {
    props: ['taskDueDate', 'dateOptions'],
    data() {
      return {
        rules: {
          required: val =>
            (val !== null && val !== '') || 'This field is required.',
          // required: val => (val && val.length > 0) || 'This field is required.',
          date: val =>
            /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(val) || 'This is not a valid date',
        },
      };
    },
    methods: {
      validateDate() {
        return this.$refs.dueDate.validate(); //call input validation here so result can be available to parent
      },
    },
  };
</script>

<style scoped></style>
