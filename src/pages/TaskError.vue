<template>
  <q-banner
    v-if="getError"
    inline-actions
    dense
    rounded
    class="bg-red-14 text-white"
  >
    An error has occurred: {{ getError }}
    <template v-slot:action>
      <q-btn flat label="Dismiss" @click="dismissAlert"/>
    </template>
  </q-banner>
</template>
<script>
  export default {
    name: 'task-error',
    props: ['dismissAlert', 'getError'],
  };
</script>
