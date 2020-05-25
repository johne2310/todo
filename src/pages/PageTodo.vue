<!--suppress ALL -->
<template>
  <q-page color="white">
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="dataLoaded">
        <!-- Search box -->
        <div class="row q-mb-sm">
          <div class="col-xs-6 col-sm-8">
            <Search></Search>
          </div>
          <div class="q-pl-sm col-xs-6 col-sm-4">
            <sort-by></sort-by>
          </div>
        </div>
        <p v-if="search && !tasksTodo.length && !tasksCompleted.length">
          No results found for this search
        </p>

        <div class="full-height column col">
          <q-scroll-area class="q-scroll-area-tasks row">
            <!--          <task-error :dismiss-alert="dismissAlert" :get-error="getError"/>-->
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

            <no-tasks
              v-if="!tasksTodo.length && !search && !settings.showOneList"
            ></no-tasks>

            <!-- active list -->
            <tasks-todo
              v-if="taskTotal"
              class="q-mt-sm"
              :tasksTodo="tasksTodo"
              :taskTotal="taskTotal"
            ></tasks-todo>

            <!-- completed todos -->
            <tasks-completed :tasksCompleted="tasksCompleted"></tasks-completed>
          </q-scroll-area>

          <!--
          sticky button. Offset calculated using screen size in computed property
          -->
          <q-page-sticky v-if="dataLoaded" position="bottom" :offset="offset">
            <q-btn rounded fab icon="add" color="info" @click="showTaskForm"/>
          </q-page-sticky>
        </div>
      </template>
      <template v-else>
        <div class="column absolute-center">
          <span class="centre">
            <q-spinner-gears color="grey-8" size="4em"/>
          </span>
          <span>
            Hold on, just hitching up them horses...
          </span>
        </div>
      </template>
    </div>
    <!-- add new task dialog -->
    <q-dialog v-model="showNewTaskForm" no-backdrop-dismiss>
      <show-add-task @closeTaskForm="showTaskForm"></show-add-task>
    </q-dialog>
  </q-page>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import TasksTodo from 'components/tasks/TasksTodo.vue';
  import TasksCompleted from 'components/tasks/TasksCompleted.vue';
  import ShowAddTask from 'components/tasks/ShowAddTask.vue';
  import Search from 'components/tasks/tools/Search.vue';
  import SortBy from 'components/tasks/tools/SortBy';
  import NoTasks from 'components/tasks/NoTasks';

  export default {
    name: 'PageIndex',
    components: {
      // TaskError,
      'no-tasks': NoTasks,
      'sort-by': SortBy,
      'tasks-todo': TasksTodo,
      'tasks-completed': TasksCompleted,
      'show-add-task': ShowAddTask,
      Search,
    },
    data() {
      return {
        dateFormat: '',
        loading: false,
        completed: false,
        showNewTaskForm: false,
        // sortBy: 'Name',

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
      ...mapActions('tasks', ['setSortBy', 'loadFirestore']),
      dismissAlert() {
        this.$store.commit('tasks/setError', null);
      },

      showTaskForm() {
        this.showNewTaskForm = !this.showNewTaskForm;
      },
      addNewTask() {
        this.showNewTaskForm = false;
      },
    },
    computed: {
      ...mapGetters('tasks', [
        'tasksTodo',
        'tasksCompleted',
        'getSortBy',
        'taskTotal',
        'getError',
      ]),
      ...mapGetters('settings', ['settings']),
      ...mapState('tasks', ['sort', 'search', 'dataLoaded']), //not state does not map when using modules without namespace

      sortBy: {
        get() {
          return this.getSortBy;
        },
        set(value) {
          this.setSortBy(value);
        },
      },
      deleted() {
        return this.$store.getters['tasks/getDeleted'];
      },
      comparePasswords() {
        return this.password !== this.confirmPassword
          ? 'Passwords do not match'
          : true;
      },
      validTask() {
        return (
          this.newTask.name.length > 0 &&
          this.newTask.dueDate != '' &&
          this.newTask.dueTime != ''
        );
      },
      offset() {
        if ( this.$q.screen.xs ) {
          return [0, -15];
        } else {
          return [0, 5];
        }
      },
    },
    mounted() {
      //load data from firebase via Vuex
      // this.$store.dispatch('tasks/bindTodos');
    },
  };
</script>
<style lang="scss" scoped>
  .buttonWidth {
    width: 145px;
    height: 38px;
  }

  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
    height: calc(100% - 80px);

    .mobile & {
      flex-basis: 100px;
    }
  }

  .button {
    width: 145px;
  }

  .q-page-sticky {
    z-index: 5000;
  }

  .div .front {
    z-index: 1;
  }

  .centre {
    align-content: center;
  }
</style>
