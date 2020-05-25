<template>
  <q-card-section class="primary darken-2 white--text my-4 row">
    <div class="text-h6">
      <slot></slot>
    </div>
    <q-space/>
    <q-btn v-close-popup flat round dense icon="close"/>
  </q-card-section>
</template>
