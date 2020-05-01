importScripts('/base/dist/worky-turkey.min.js')

const ui = workyTurkey.expose({
  test (...args) {
    ui.testFn(...args)
  },
  nested: {
    test (...args) {
      ui.nested.testFn(...args)
    }
  }
})

ui.testFn(true, false, 'foo', 42, {}, [])
ui.nested.testFn(true, false, 'foo', 42, {}, [])
