<template>
  <q-input
    ref="name"
    sanitize
    autofocus
    @focus="$event.target.select()"
    :value="taskName"
    outlined
    hint="Task name"
    @input="$emit('update:taskName', $event)"
    :rules="[rules.required]"
  >
    <template v-slot:prepend>
      <q-icon name="mdi-note-text" color="primary"/>
    </template>
  </q-input>
</template>

<script>
  export default {
    props: ['taskName'],
    data() {
      return {
        rules: {
          required: val => (val && val.length > 0) || 'This field is required.',
        },
      };
    },
    methods: {
      selectAll(event) {
        event.target.select();
      },
      validateName() {
        return this.$refs.name.validate(); //call input validation here so result can be available to parent
      },
    },
    computed: {},
  };
</script>
