const assert = require('assert');
const EventEmitter = require('../index.js');

describe('Emitter tests', () => {

  var numberOfEmissions = 0;
  var savedArgs = null;
  const args = ['args1', 'args2'];
  const myEvent = 'myEvent';

  var incrementListener = function(args) {
    numberOfEmissions++;
    savedArgs = args;
  };

  var cleanUp = function(){
    numberOfEmissions = 0;
    savedArgs = null;
    EventEmitter.unregisterAll(myEvent);
  };

  it('registers a listener', () => {
    EventEmitter.register(myEvent, incrementListener);
    assert.deepEqual(EventEmitter.triggers[myEvent], [incrementListener]);
  });

  it('emits a listener', () => {
    cleanUp();
    EventEmitter.register(myEvent, incrementListener);

    for(var i = 0; i < 10; i++){
      savedArgs = null;
      assert.equal(numberOfEmissions, i);
      EventEmitter.emit(myEvent, args);
      assert.equal(numberOfEmissions, i+1);
      assert.equal(savedArgs, args);
    }
  });

  it('unregisters one listener', () => {
    cleanUp();

    EventEmitter.register(myEvent, incrementListener);
    EventEmitter.unregister(myEvent, incrementListener);
    assert.equal(EventEmitter.triggers[myEvent].length, 0);
  });

  it('unregisters all listeners', () => {

    for(var i = 0; i < 3; i++){
      EventEmitter.register(myEvent, function(args){}); // eslint-disable-line
    }

    assert.equal(EventEmitter.triggers[myEvent].length, 3);
    EventEmitter.unregisterAll(myEvent);
    assert.equal(EventEmitter.triggers[myEvent].length, 0);
  });

  it('registers a listener once', () => {

    cleanUp();
    EventEmitter.once(myEvent, incrementListener);
    assert.equal(EventEmitter.triggers[myEvent].length, 1);

    EventEmitter.emit(myEvent, args);
    assert.equal(numberOfEmissions, 1);
    assert.equal(savedArgs, args);
    assert.equal(EventEmitter.triggers[myEvent].length, 0);
  });

});
