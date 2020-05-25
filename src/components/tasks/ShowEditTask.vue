<template>
  <q-card class="mx-auto mt-5" style="width: 500px">
    <TaskHeader>Edit Task</TaskHeader>
    <q-form @submit.prevent="saveTask">
      <q-card-section>
        <TaskName :taskName.sync="newTask.name"></TaskName>

        <!-- date input -->
        <TaskDueDate
          :taskDueDate.sync="newTask.dueDate"
          :dateOptions="dateOptions"
        >
        </TaskDueDate>
        <!-- time input -->
        <TaskDueTime
          :taskDueTime.sync="newTask.dueTime"
          :isDateSet="isDateSet"
        ></TaskDueTime>
      </q-card-section>
      <!--      <q-separator />-->
      <!-- Action buttons -->
      <TaskButtons :validTask="validTask"></TaskButtons>
    </q-form>
  </q-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';
  import mixinAddEditTask from 'src/mixins/mixin-add-edit-task.js';
  import { date } from 'quasar';
  import TaskHeader from 'components/tasks/TaskHeader.vue';
  import TaskName from 'components/tasks/TaskName.vue';
  import TaskDueDate from 'components/tasks/TaskDueDate.vue';
  import TaskDueTime from 'components/tasks/TaskDueTime.vue';
  import TaskButtons from 'components/tasks/TaskButtons.vue';

  export default {
    mixins: [mixinAddEditTask],
    props: ['taskId', 'taskToEdit'],
    components: {
      TaskHeader,
      TaskName,
      TaskDueDate,
      TaskDueTime,
      TaskButtons,
    },
    data() {
      return {
        newTask: {},
        today: '',
      };
    },
    methods: {
      saveTask() {
        //convert 12 hour format to 24 hour format for saving. This ensure toggle 12-24 mode will work
        if ( this.settings.show12HourFormat ) {
          this.newTask.dueTime = moment(this.newTask.dueTime, 'hh:mma').format(
            'HH:mm'
          );
        } else {
          this.newTask.dueTime = moment(this.newTask.dueTime, 'HH:mm').format(
            'HH:mm'
          );
        }
        this.newTask.sortDate = moment(this.newTask.dueDate, 'DD/MM/YYYY').format(
          'X'
        );
        this.newTask.id = this.taskId;
        this.$store.dispatch('tasks/updateTask', this.newTask);
        this.$emit('closeTaskForm');
      },
    },
    computed: {
      ...mapGetters('settings', ['settings']),

      taskDueDate() {
        return moment(this.taskToEdit.dueDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
      },
    },
    filters: {
      longDate(value) {
        return date.formatDate(value, 'ddd, D MMM YYYY');
      },
      displayDate(value) {
        return date.formatDate(value, 'DD/MM/YYYY');
      },
    },
    created() {
      //copy taskToEdit prop to new object
      this.newTask = Object.assign({}, this.taskToEdit);
      this.newTask.dueDate = moment(this.taskToEdit.dueDate, 'DD/MM/YYYY').format(
        'DD/MM/YYYY'
      );
    },
  };
</script>

<style scoped></style>
