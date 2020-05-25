<template>
  <q-card class="mx-auto mt-5" style="width: 500px">
    <TaskHeader>Add New Task</TaskHeader>
    <div>
      <q-form ref="form" greedy @submit.prevent="addNewTask">
        <q-card-section>
          <TaskName ref="name" :taskName.sync="newTask.name"></TaskName>

          <!-- date input -->
          <TaskDueDate
            ref="dueDate"
            :taskDueDate.sync="newTask.dueDate"
            :dateOptions="dateOptions"
          >
          </TaskDueDate>
          <!-- time input -->
          <TaskDueTime
            ref="dueTime"
            :taskDueTime.sync="newTask.dueTime"
            :isDateSet="isDateSet"
          ></TaskDueTime>
        </q-card-section>
        <q-separator/>
        <!-- Action buttons -->
        <TaskButtons :validTask="validTask"></TaskButtons>
      </q-form>
    </div>
  </q-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';
  import mixinAddEditTask from 'src/mixins/mixin-add-edit-task.js';
  import TaskHeader from 'components/tasks/TaskHeader.vue';
  import TaskName from 'components/tasks/TaskName.vue';
  import TaskDueDate from 'components/tasks/TaskDueDate.vue';
  import TaskDueTime from 'components/tasks/TaskDueTime.vue';
  import TaskButtons from 'components/tasks/TaskButtons.vue';

  export default {
    mixins: [mixinAddEditTask],
    components: {
      TaskHeader,
      TaskName,
      TaskDueDate,
      TaskDueTime,
      TaskButtons,
    },
    data() {
      return {
        newTask: {
          // id: '',
          name: '',
          dueDate: '',
          dueTime: '',
          completed: false,
        },
        today: '',
        rules: {
          required: val =>
            (val !== null && val !== '') || 'This field is required.',
          // required: val => (val && val.length > 0) || 'This field is required.',
        },
        test: '',
      };
    },
    methods: {
      checkName() {
        return this.$refs.name.validateName();
      },
      checkDueDate() {
        return this.$refs.dueDate.validateDate();
        // console.log('checkDueDate: ', this.$refs.dueDate.validateDate());
      },
      checkDueTime() {
        return this.$refs.dueTime.validateTime();
      },

      addNewTask() {
        // call the input validate function to trigger error messages of the form
        this.checkName();
        this.checkDueTime();
        this.checkDueDate();
        // if all validations return true then process save
        if ( this.checkName() && this.checkDueDate() && this.checkDueTime() ) {
          if ( this.settings.show12HourFormat ) {
            this.newTask.dueTime = moment(this.newTask.dueTime, 'hh:mma').format(
              'HH:mm'
            );
          } else {
            this.newTask.dueTime = moment(this.newTask.dueTime, 'HH:mm').format(
              'HH:mm'
            );
          }
          //use sortDate field to record UTC format date and use this for sorting array
          this.newTask.sortDate = moment(
            this.newTask.dueDate,
            'DD/MM/YYYY'
          ).format('X');
          this.$store.dispatch('tasks/createTask', this.newTask);
          this.$emit('closeTaskForm');
        } else {
          // console.log('there is an error');
        }
      },
    },
    computed: {
      ...mapGetters('settings', ['settings']),
    },
  };
</script>

<style scoped></style>
