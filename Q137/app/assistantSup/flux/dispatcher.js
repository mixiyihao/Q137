var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var Store = require('./store.js');

AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case 'SAVE_NEW_ITEM':
        Store.addNewItemHandler(action.obj);
        // Store.emitChange();
      break;
    default:
      // no op
  }
})

module.exports = AppDispatcher;