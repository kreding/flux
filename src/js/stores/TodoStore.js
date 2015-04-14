const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

// data storage
let _data = [];

// add private functions to modify data
function addItem(title, completed=false) {
  _data.push({title, completed});
}

function clearAllItems(){
	_data = [];
}

// Facebook style store creation.
let TodoStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      tasks: _data
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_TASK:
        let text = action.text.trim();
        if (text !== '') {
          addItem(text);
          TodoStore.emitChange();
        }
        break;

      case Constants.ActionTypes.CLEAR_TASK:;
      	clearAllItems();
      	TodoStore.emitChange();
      	break;
    }
  })

});

module.exports = TodoStore;
