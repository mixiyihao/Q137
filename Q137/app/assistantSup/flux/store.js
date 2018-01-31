var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

export let ListStore = assign({}, EventEmitter.prototype, {
  userItem:{},


  getAll: function () {
    return this.items;
  },
  getItem: function(){
      return this.userItem;
  },
  setItem: function(obj){
      this.userItem.name = obj.name;
      this.userItem.password = obj.password;
  },
  removeItem :function(flag){
      

  }
//   addNewItemHandler: function (text) {
//     this.items.push(text);
//   },

//   emitChange: function () {
//     this.emit('change');
//   },

//   addChangeListener: function(callback) {
//     this.on('change', callback);
//   },

//   removeChangeListener: function(callback) {
//     this.removeListener('change', callback);
//   }
});
