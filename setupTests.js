global.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}

global.Headers = () => {}
;(() => {
  // This warning is emitted:
  // "Warning: React depends on requestAnimationFrame."
  // when we load enzyme via import.
  // This is because the import happens before the global polyfill is applied.
  // This should be fixed when kyt dependencies are updated
  // See https://github.com/facebook/jest/issues/4545

  // eslint-disable-next-line global-require
  const configure = require('enzyme').configure
  // eslint-disable-next-line global-require
  const Adapter = require('enzyme-adapter-react-16')

  configure({ adapter: new Adapter() })
})()
