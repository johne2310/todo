import { date } from 'quasar';

export default {
  data() {
    return {
      mounted: false,
    };
  },
  methods: {
    dateOptions(dateOption) {
      this.today = date.formatDate(new Date(), 'YYYY/MM/DD');
      return dateOption >= this.today;
    },
  },
  computed: {
    //activate save button only if task name exists
    validTask() {
      return this.newTask.name.length > 0;
      // if (this.mounted) {
      //   return !(
      //     this.newTask.name.length > 0 ||
      //     this.newTask.dueDate.length > 0 ||
      //     this.newTask.dueTime.length > 0
      //   );
      // }
    },
    isDateSet() {
      //only activate time component if a date exists
      return this.newTask.dueDate === '';
    },
  },
  mounted() {
    this.mounted = true;
  },
};
