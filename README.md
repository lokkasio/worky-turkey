# worky-turkey

> call functions in web worker from main thread (et vice versa)

<img src="worky-turkey.svg" width="500" alt="a turkey with a safety helmet">

## Usage

index.html

```html
<button type="button" id="counter"></button>
<script src="…/wokry-turkey.min.js"></script>
<script>
  const counterButton = document.getElementById('counter')
  const worker = workyTurkey.expose(
    {
      // the `render` function will be available in the worker
      render (value) {
        counterButton.textContent = value
      }
    },
    new Worker('worker.js')
  )

  counterButton.addEventListener('click', function () {
    // call the `increment` function exposed by the worker
    worker.increment()
  })
</script>
```

worker.js

```js
loadScripts('…/worky-turkey.min.js')
let counter = 0;

const ui = workyTurkey.expose({
  // the `increment` function will be available in the main thread
  increment(value = 1) {
    counter += value
    // call the `render` function exposed by the ui thread
    ui.render(counter)
  }
});

// call the `render` function exposed by the ui thread
ui.render(counter)
…
```

## Browser support

worky-turkey uses [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), whose are supported in all evergreen browsers: [caniuse proxy](https://caniuse.com/#feat=proxy)

## But...

### What's about [Comlink](https://github.com/GoogleChromeLabs/comlink)?

worky-turkey is heavily inspired by Comlink. But there are use cases, you just don't need the super power of Comlink.

Comparend to [Comlink](https://github.com/GoogleChromeLabs/comlink), worky-turkey...

- only supports function calls
- does _not_ return anything (just fire and forget)
- does _not_ support callbacks as function parameter (just [Transferables](https://github.com/GoogleChromeLabs/comlink/blob/master/structured-clone-table.md). As rule of thumb: only use primitives, plain objects and arrays as parameter)
- is written in less than 25 lines of code 😎 (~300 bytes minified, ~240 bytes gzipped)

This is **great** if you just want the other side know, that something has to be done.  
This is **not so great** if you rely on the result of the other sides function call.

### Why do I need a library for this simple task?

Of course, you can `postMessage` something like `{ fn: 'doSomething', params: ['foo', 42] }` and handle it accordingly on the other side, but it simply feels more naturally to call `worker.doSomething('foo', 42)`.
