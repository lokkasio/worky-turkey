QUnit.module('worky-turkey', function () {
  QUnit.test('worker communication', function (t) {
    const done = t.async(4)
    function testFn (a, b, c, d, e, f) {
      t.equal(a, true)
      t.equal(b, false)
      t.equal(c, 'foo')
      t.equal(d, 42)
      t.equal(typeof e, 'object')
      t.ok(Array.isArray(f))
      done()
    }
    const worker = workyTurkey.expose(
      {
        testFn,
        nested: {
          testFn
        }
      },
      new Worker('/base/test/worker.js')
    )
    worker.test(true, false, 'foo', 42, {}, [])
    worker.nested.test(true, false, 'foo', 42, {}, [])
  })
})
