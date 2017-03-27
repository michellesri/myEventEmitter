const assert = require('assert');
const EventEmitter = require('../index.js');

// TODO: check the (done)


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

  it('registers a listener', (done) => {
    EventEmitter.register(myEvent, incrementListener);
    assert.deepEqual(EventEmitter.triggers[myEvent], [incrementListener]);
    done();
  });

  it('emits a listener', (done) => {
    cleanUp();
    EventEmitter.register(myEvent, incrementListener);

    for(var i = 0; i < 10; i++){
      savedArgs = null;
      assert.equal(numberOfEmissions, i);
      EventEmitter.emit(myEvent, args);
      assert.equal(numberOfEmissions, i+1);
      assert.equal(savedArgs, args);
    }
    done();
  });

  it('unregisters one listener', (done) => {
    cleanUp();

    EventEmitter.register(myEvent, incrementListener);
    EventEmitter.unregister(myEvent, incrementListener);
    assert.equal(EventEmitter.triggers[myEvent].length, 0);
    done();
  });

  it('unregisters all listeners', (done) => {
    cleanUp();

    for(var i = 0; i < 3; i++){
      EventEmitter.register(myEvent, function(args){}); // eslint-disable-line
    }

    assert.equal(EventEmitter.triggers[myEvent].length, 3);
    EventEmitter.unregisterAll(myEvent);
    assert.equal(EventEmitter.triggers[myEvent].length, 0);
    done();
  });

  it('registers a listener once', (done) => {

    cleanUp();
    EventEmitter.once(myEvent, incrementListener);
    assert.equal(EventEmitter.triggers[myEvent].length, 1);

    EventEmitter.emit(myEvent, args);
    assert.equal(numberOfEmissions, 1);
    assert.equal(savedArgs, args);
    assert.equal(EventEmitter.triggers[myEvent].length, 0);
    done();
  });

});
