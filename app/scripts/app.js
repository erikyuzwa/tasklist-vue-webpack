
'use strict';

var Vue = require('vueLib');

new Vue({

  el: '#todo',

  data: {
    label: {
      add: 'Add',
      clearAll: 'Clear All',
      inputPlaceholder: "What's on your plate?",
      title: 'Tasks...',
    },
    currentTask: '',
    taskList: []
  },

  computed: {
    areAllSelected: function() {
      return this.taskList.every(function(task) {
        return task.checked;
      }) && this.taskList.length > 0;
    },
  },

  methods: {

    addTask: function() {
      var task = this.currentTask.trim();
      if (task) {
        this.taskList.push({
          text: task,
          checked: false
        });
        this.currentTask = '';
      }
    },

    removeTask: function(task) {
      this.taskList.$remove(task);
    },

    clearAll: function() {
      this.taskList = [];
    },

    selectAll: function(task) {
      var targetValue = this.areAllSelected ? false : true;
      for (var i = 0; i < this.taskList.length; i++) {
        this.taskList[i].checked = targetValue;
      }
    }
  }
});
