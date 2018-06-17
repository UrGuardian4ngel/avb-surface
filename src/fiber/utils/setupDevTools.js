Object.defineProperty(global, 'WebSocket', {
  value: require('ws')
});

Object.defineProperty(global, 'window', {
  value: global
});

const { connectToDevTools } = require('react-devtools-core');

connectToDevTools({
  isAppActive() {
    // Don't steal the DevTools from currently active app.
    return true;
  },
  host: 'localhost',
  resolveRNStyle: null,
});
