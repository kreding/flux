var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addItem: function(text) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_TASK,
      text: text
    });
  },

  clearList: function() {
    AppDispatcher.handleViewAction({
    	type: Constants.ActionTypes.CLEAR_TASK
    });
  },

  completeTask: function(task) {
    console.warn('completeTask action not yet implemented...');
  }

};
