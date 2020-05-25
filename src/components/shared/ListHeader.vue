<template>
  <q-banner dense rounded :class="bgColour" class="text-white text-center">
    <div class="text-subtitle1">
      <slot></slot>
    </div>
  </q-banner>
</template>

<script>
export default {
  props: ['bgColour'],
};
</script>

<style scoped></style>
