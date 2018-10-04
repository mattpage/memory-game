/* eslint-disable prefer-template, max-len */

const getDeferScript = src => (src ? `<script defer src="${src}"></script>` : '')

export default vo => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    ${
      vo.mainCSSBundle
        ? '<link rel="stylesheet" type="text/css" href="' + vo.mainCSSBundle + '">'
        : ''
    }

    <title>Memory Game</title>
  </head>

  <body>
    <div id="root">${vo.html}</div>
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(vo.preloadedState).replace(/</g, '\\u003c')}
    </script>
    ${getDeferScript(vo.manifestJSBundle)}
    ${getDeferScript(vo.vendorJSBundle)}
    ${getDeferScript(vo.mainJSBundle)}
  </body>
</html>`
