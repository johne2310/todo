<template>
  <q-card-actions class="pa-5">
    <q-space/>
    <q-btn :disabled="!validTask" color="primary" type="submit" label="Save">
    </q-btn>
  </q-card-actions>
</template>

<script>
  export default {
    props: ['validTask'],
  };
</script>
