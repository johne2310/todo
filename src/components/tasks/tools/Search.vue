<template>
  <q-input
    class="q-pb-sm col"
    v-model="searchField"
    @keyup.esc="searchField = ''"
    debounce="500"
    label="Enter search"
    clearable
    outlined
    dense
    @focus="selectAll($event)"
  >
    <template v-slot:append>
      <q-icon name="search"/>
    </template>
  </q-input>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {};
    },
    methods: {
      ...mapActions('tasks', ['setSearchValue']),
      selectAll(event) {
        event.target.select();
      },
    },
    computed: {
      ...mapGetters('tasks', ['getSearch']),
      searchField: {
        get() {
          return this.getSearch;
        },
        set(value) {
          this.setSearchValue(value);
        },
      },
    },
  };
</script>

<style scoped></style>
