<template>
  <!-- completed list -->
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated fadeOut"
  >
    <div :class="{ 'q-mt-lg': !settings.showOneList }">
      <list-header
        class="q-mt-md"
        v-if="!settings.showOneList"
        key="list-header"
        bgColour="bg-grey"
      >Completed Tasks
      </list-header>
      <tasks-todo
        v-for="task in tasksCompleted"
        :key="task.id"
        :task="task"
      ></tasks-todo>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex';
  import ListHeader from 'components/shared/ListHeader.vue';
  import TaskList from 'components/tasks/TaskList.vue';

  export default {
    props: ['tasksCompleted'],
    components: {
      'tasks-todo': TaskList,
      'list-header': ListHeader,
    },
    computed: {
      ...mapGetters('settings', ['settings']),
    },
  };
</script>

<style scoped></style>
