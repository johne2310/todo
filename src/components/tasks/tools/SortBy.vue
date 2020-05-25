<template>
  <q-select
    class="q-ml-sm"
    bg-color="grey-3"
    outlined
    v-model="sortBy"
    :options="options"
    dense
    emit-value
    map-options
  >
    <template v-slot:prepend>
      <q-icon name="mdi-sort"/>
    </template>
  </q-select>
  <!--  </div>-->
</template>
<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'sort-by',
    data() {
      return {
        options: [
          {
            label: 'Name',
            value: 'name',
          },
          {
            label: 'Due Date',
            value: 'dueDate',
          },
        ],
      };
    },
    methods: {
      ...mapActions('tasks', ['setSortBy']),
    },
    computed: {
      ...mapState('tasks', ['sort']),
      sortBy: {
        get() {
          return this.sort;
        },
        set(value) {
          this.setSortBy(value);
        },
      },
    },
  };
</script>
<style scoped></style>
