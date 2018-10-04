import 'whatwg-fetch'
import { URL } from './constants'

function request(options = {}) {
  const config = Object.assign(
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    },
    options
  )
  return fetch(URL, config).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
  })
}

export default request
