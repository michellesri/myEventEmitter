# My Event Emitter

- An Event Emitter module in JavaScript (ES6) that does not subclass or otherwise require an existing Event Emitter module.

- Event Emitters are objects that serve as the core building block in event-driven architectures. They simplify the process of handling asynchronous events and enable clean and decoupled code.

### Usage

````
let ev = new EventEmitter();
ev.register('eat', (arg) => {
    console.log(arg + ' ate');
});

ev.emit('eat', 'dog'); // prints 'dog ate'
ev.emit('eat', 'cat'); // prints 'cat ate'

ev.unregisterAll('eat');
ev.emit('eat', 'dog'); // nothing happens
````

##### Emits named events with any number of arguments:

````
  emit(trigger, args)
````
##### Registers handler functions for named events that are passed the appropriate arguments on emission:

````
  register(trigger, listener)
````

##### Registers a "one-time" handler that will be called at most one time:

````
  once(trigger, listener)
````

##### Removes specific previously-registered event handlers:

````
  unregister(trigger, listener)
````
##### Removes all previously-registered event handlers:

````
  unregisterAll(trigger)
````

### Installation

myEventEmitter requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```
$ cd myEventEmitter
$ npm install
$ npm run build
$ node bundle.js
```

Run the build if code usage needs to be in ES5...

```
$ npm run build
```

### Development

- myEventEmitter uses Webpack for fast developing.
- the webpack.config.js file includes a babel loader that transpiles ES6 into ES5 (bundle.js).
- the dependencies that are needed for this module are located in the package.json.
