<template>
  <q-item clickable :to="path" exact dark class="text-blue-grey-8">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption class="text-blue-grey-8">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
  export default {
    name: 'EssentialLink',
    props: {
      link: {
        type: Object,
      },
      title: {
        type: String,
        required: true,
      },

      caption: {
        type: String,
        default: '',
      },

      path: {
        type: Object,
        required: true,
      },

      icon: {
        type: String,
        default: '',
      },
    },
  };
</script>
