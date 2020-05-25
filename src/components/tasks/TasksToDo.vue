<!--suppress ALL -->
<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute top"
  >
    <div>
      <list-header
        v-if="!settings.showOneList"
        key="list-header"
        bgColour="bg-primary"
      >Active Tasks
      </list-header>

      <q-list>
        <task-list
          v-for="task in tasksTodo"
          :key="task.id"
          :task="task"
        ></task-list>
      </q-list>
    </div>
  </transition>
</template>

<script>
  const envFile = require('../../../.quasar.env.json');
  const env = envFile[process.env.QENV];
  import { mapGetters } from 'vuex';
  import ListHeader from 'components/shared/ListHeader.vue';
  import TaskList from 'components/tasks/TaskList.vue';
  // import NoTasks from 'components/tasks/NoTasks';

  export default {
    name: 'TasksToDo',
    props: ['tasksTodo', 'taskTotal'],
    components: {
      // NoTasks,
      'task-list': TaskList,
      'list-header': ListHeader,
    },
    computed: {
      ...mapGetters('settings', ['settings']),
    },
  };
</script>
