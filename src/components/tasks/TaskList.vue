<template>
  <div>
    <q-list bordered>
      <q-item
        v-ripple
        clickable
        @click="toggleCompleted(task)"
        :class="!task.completed ? 'bg-grey-2' : 'bg-grey-3'"
        v-touch-hold:1000.mouse="showEditForm"
      >
        <q-item-section avatar>
          <q-checkbox
            name="completed"
            v-model="task.completed"
            class="no-pointer-events"
          />
        </q-item-section>

        <q-space/>

        <q-item-section>
          <q-item-label
            class="lhs"
            :class="{ showCompleted: task.completed }"
            v-html="$options.filters.searchHighlight(task.name, search)"
          >
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <!--
          using class lt-sm makes component appear only for screens < sm
          -->
          <q-item-label class="lt-sm rhs"
          >{{ taskDueDate | shortDate }}
          </q-item-label>
          <q-item-label class="gt-xs rhs"
          >{{ taskDueDate | longDate }}
          </q-item-label>
          <q-item-label>{{ taskDueTime }}</q-item-label>
        </q-item-section>

        <!--
            Only show section if screen size > xs
            Then format icon
         -->
        <q-item-section class="gt-xs" side v-if="task.dueDate">
          <q-icon name="mdi-calendar-today" size="sm" left color="primary"/>
          <q-icon name="mdi-alarm" size="sm" left color="info"/>
        </q-item-section>

        <q-separator vertical spaced/>

        <!--
        Format button size usng computed value to get screen size
        -->
        <q-item-section side>
          <q-btn
            round
            color="primary"
            :size="btnSize"
            icon="post_add"
            @click.stop="editTask"
          />
        </q-item-section>
        <q-item-section side>
          <q-btn
            round
            color="red"
            icon="delete_outline"
            :size="btnSize"
            @click.stop="deleteSelectedTask(task.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- edit task dialog -->
    <q-dialog v-model="showEditTaskForm" no-backdrop-dismiss>
      <show-edit-task
        @closeTaskForm="showEditTaskForm = false"
        :taskId="task.id"
        :taskToEdit="task"
      ></show-edit-task>
    </q-dialog>
  </div>
</template>

<script>
  import { date } from 'quasar';
  import moment from 'moment';

  import { mapActions, mapGetters, mapState } from 'vuex';
  import ShowEditTask from 'components/tasks/ShowEditTask.vue';

  export default {
    components: {
      'show-edit-task': ShowEditTask,
    },
    filters: {
      longDate(value) {
        return date.formatDate(value, 'ddd, D MMM YYYY');
      },
      shortDate(value) {
        return date.formatDate(value, 'DD/MM/YYYY');
      },
      searchHighlight(value, search) {
        if ( search ) {
          const searchRegExp = new RegExp(search, 'ig');
          return value.replace(searchRegExp, match => {
            return '<span class="bg-light-blue-3">' + match + '</span>';
          });
        }
        return value;
      },
    },
    props: ['task'],
    data() {
      return {
        newTask: {},
        showEditTaskForm: false,
      };
    },
    computed: {
      ...mapState('tasks', ['search']), //needs module to be namespaced to work
      ...mapGetters('settings', ['settings']),
      ...mapGetters('tasks', ['getSearch']),

      btnSize() {
        if ( this.$q.screen.xs ) {
          return 'sm';
        } else {
          return 'md';
        }
      },
      search() {
        return this.getSearch;
      },
      taskDueDate() {
        return moment(this.task.dueDate, 'DD/MM/YYYY').format('ll');
      },
      taskDueTime() {
        if ( this.settings.show12HourFormat ) {
          return moment(this.task.dueTime, 'HH:mm').format('LT');
        } else {
          return this.task.dueTime;
        }
      },
    },
    methods: {
      deleteSelectedTask(id) {
        this.$q
          .dialog({
            title: 'Confirm',
            message: 'Would you like to delete this task?',
            persistent: true,
            ok: {
              color: 'primary',
              push: true,
            },
            cancel: {
              color: 'negative',
              push: true,
            },
          })
          .onOk(() => {
            this.deleteTask(id);
          });
      },
      editTask() {
        this.showEditTaskForm = !this.showEditTaskForm;
      },
      ...mapActions('tasks', ['updateTask', 'deleteTask']),
      showEditForm() {
        this.showEditTaskForm = true;
      },
      toggleCompleted(task) {
        this.task.sortDate = moment(this.task.dueDate, 'DD/MM/YYYY').format('X');
        const changedTask = {
          id: task.id,
          name: task.name,
          dueDate: task.dueDate,
          dueTime: task.dueTime,
          completed: !task.completed,
          sortDate: task.sortDate,
        };
        // noinspection JSValidateTypes
        this.updateTask(changedTask);
      },
    },
  };
</script>

<style scoped>
  .showCompleted {
    text-decoration: line-through;
  }

  .rhs {
    text-align: right;
  }

  .lhs {
    text-align: left;
  }
</style>
