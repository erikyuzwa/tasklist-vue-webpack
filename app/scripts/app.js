
'use strict';

// reference our Vue.js library via our require mapping defined in webpack.config.js
var Vue = require('vueLib');

// create a new Vue View which binds itself to the given .el
new Vue({

  // our element to bind our View to
  el: '#todo',

  // each Vue View has an [el, data, methods] Object sections.
  // data could be thought of as the Model for this View
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
    }
  },

  // our exposed "methods" available to our Vue View. Essentially just linking the .el with our .data
  methods: {

    // take the current task input text, trim it, and add it to our data model tracking the task list
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

    // remove our chosen task from the data model task list. $remove is an Array.splice
    removeTask: function(task) {
      this.taskList.$remove(task);
    },

    // remove all of our tasks from the data model task list
    clearAll: function() {
      this.taskList = [];
    },

    // a helper method to go through each task object in our data model and set the
    // checked property
    selectAll: function(task) {
      var targetValue = this.areAllSelected ? false : true;
      for (var i = 0; i < this.taskList.length; i++) {
        this.taskList[i].checked = targetValue;
      }
    }
  }
});
