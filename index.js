export function expose (obj, context = self) {
  if (obj) {
    context.addEventListener('message', function ({ data }) {
      const [path, args] = data
      const fn = path.split('.').reduce(function (acc, value) {
        return acc[value]
      }, obj)
      fn(...args)
    })
  }

  function createProxy (path) {
    return new Proxy(function () {}, {
      get (_, prop) {
        return createProxy(path ? `${path}.${prop}` : prop)
      },
      apply (_, __, args) {
        context.postMessage([path, args])
      }
    })
  }

  return createProxy()
}
