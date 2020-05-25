<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated fadeOut"
  >
    <q-banner class="bg-blue-2 text-blue-grey-14 text-center">
      <q-icon name="mdi-check-circle-outline" style="font-size: 2em;"/>
      Well done. You have completed all your tasks!
    </q-banner>
  </transition>
</template>
<script>
  export default {
    name: 'no-tasks',
  };
</script>
