var AppDispatcher = require('./dispatcher.js');

export let UserActions = {

  saveNewItem: function (obj) {
    AppDispatcher.dispatch({
      actionType: 'SAVE_NEW_ITEM',
      obj: obj
    });
  },

};

