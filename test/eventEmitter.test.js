const assert = require('assert');
import {EventEmitter} from '../index.js';

describe('Emitter tests', () => {

  let ev = new EventEmitter();

  let numberOfEmissions = 0;
  let savedArgs = null;
  const args = ['args1', 'args2'];
  const myEvent = 'myEvent';

  let incrementListener = (args) => {
    numberOfEmissions++;
    savedArgs = args;
  };

  let cleanUp = () => {
    numberOfEmissions = 0;
    savedArgs = null;
    ev.unregisterAll(myEvent);
  };

  it('registers a listener', () => {
    ev.register(myEvent, incrementListener);
    assert.deepEqual(ev.triggers[myEvent], [incrementListener]);
  });

  it('emits a listener', () => {
    cleanUp();
    ev.register(myEvent, incrementListener);

    for(let i = 0; i < 10; i++){
      savedArgs = null;
      assert.equal(numberOfEmissions, i);
      ev.emit(myEvent, args);
      assert.equal(numberOfEmissions, i+1);
      assert.equal(savedArgs, args);
    }
  });

  it('unregisters one listener', () => {
    cleanUp();

    ev.register(myEvent, incrementListener);
    ev.unregister(myEvent, incrementListener);
    assert.equal(ev.triggers[myEvent].length, 0);
  });

  it('unregisters all listeners', () => {
    cleanUp();

    for(let i = 0; i < 3; i++){ //registers multiple listeners
      ev.register(myEvent, (args) => {});
    }

    assert.equal(ev.triggers[myEvent].length, 3);
    ev.unregisterAll(myEvent);
    assert.equal(ev.triggers[myEvent].length, 0);
  });

  it('registers a listener once', () => {
    cleanUp();
    ev.once(myEvent, incrementListener);
    assert.equal(ev.triggers[myEvent].length, 1);

    ev.emit(myEvent, args);
    assert.equal(numberOfEmissions, 1);
    assert.equal(savedArgs, args);
    assert.equal(ev.triggers[myEvent].length, 0);
  });

});
