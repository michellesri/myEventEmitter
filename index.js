
/*
Event Emitters are objects that serve as the core building block in event-driven architectures. They simplify the process of handling asynchronous events and enable clean and decoupled code.

Create an Event Emitter module in JavaScript (as modern of a version as you prefer) with documentation and tests. Your implementation should allow for:

- Emitting named events with any number of arguments.
- Registering handler functions for named events that are passed the appropriate arguments on emission.
- Registering a "one-time" handler that will be called at most one time.
- Removing specific previously-registered event handlers and/or all previously-registered event handlers.
- This module should be suitable for publishing to npm, though it is not necessary for you to do so.

Do not subclass or otherwise require an existing Event Emitter module.
*/

var EventEmitter = {};

EventEmitter.triggers = {};

EventEmitter.register = function(trigger, listener){
  if(this.triggers[trigger]){
    this.triggers[trigger].push(listener);
  } else {
    this.triggers[trigger] = [listener];
  }
};

EventEmitter.emit = function(trigger, args){
  if(this.triggers[trigger]){
    var tempArr = [];
    for (var i = 0; i < this.triggers[trigger].length; i++) {
      tempArr.push(this.triggers[trigger][i]);
    }

    for(var j = 0; j < tempArr.length; j++){
      let listener = tempArr[j];
      listener(args);
    }
  }
};

EventEmitter.unregister = function(trigger, listener){
  if(this.triggers[trigger]){
    let position = this.triggers[trigger].indexOf(listener);
    if(position > -1){
      this.triggers[trigger].splice(position, 1);
    }
  }
};

EventEmitter.unregisterAll = function(trigger){
  if(this.triggers[trigger]){
    this.triggers[trigger] = [];
  }
};

EventEmitter.once = function(trigger, listener){
  var self = this;
  var tmp = function(args) {
    listener(args);
    self.unregister(trigger, tmp);
  };
  this.register(trigger, tmp);
};

module.exports = EventEmitter;

//
// EventEmitter.emit('eat', [ 'cat' ]);
// // cat ate!
// EventEmitter.emit('eat', [ 'cat' ]);
// // cat is sooooo full!
// EventEmitter.emit('eat', [ 'cat' ]);
// // cat is sooooo full!
// EventEmitter.emit('eat', [ 'cat' ]);
// // cat is sooooo full!
// EventEmitter.emit('eat', [ 'cat' ]);
// cat is sooooo full!
