import reducer from './reducer'

describe('App Reducer', () => {
  describe('none', () => {
    it('should return state', () => {
      const action = { type: 'foo', error: {} }
      const expectedResult = {}
      expect(reducer({}, action)).toEqual(expectedResult)
    })
  })

  describe('initialState', () => {
    it('should return default initial state', () => {
      const expectedResult = {}
      expect(reducer(undefined, {})).toEqual(expectedResult)
    })
  })
})
