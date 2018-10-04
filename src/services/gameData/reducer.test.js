import reducer from './reducer'
import { NOT_ASKED, LOADING, SUCCESS, FAILURE } from './constants'

describe('gameData Service Reducer', () => {
  describe('NOT_ASKED', () => {
    it('should set the status to NOT_ASKED', () => {
      const action = { type: NOT_ASKED }
      const expectedResult = { status: NOT_ASKED }
      expect(reducer({}, action)).toEqual(expectedResult)
    })

    it('should clear the state of other properties', () => {
      const action = { type: NOT_ASKED }
      const expectedResult = { status: NOT_ASKED }
      expect(reducer({ params: {}, results: {} }, action)).toEqual(expectedResult)
    })
  })

  describe('LOADING', () => {
    it('should set the status to LOADING', () => {
      const action = { type: LOADING }
      const expectedResult = { status: LOADING }
      expect(reducer({}, action)).toEqual(expectedResult)
    })

    it('should clear the state of other properties', () => {
      const action = { type: LOADING }
      const expectedResult = { status: LOADING }
      const state = { type: SUCCESS, results: {} }
      expect(reducer(state, action)).toEqual(expectedResult)
    })
  })

  describe('SUCCESS', () => {
    it('should set the status to SUCCESS and results to action.results', () => {
      const action = { type: SUCCESS, results: {} }
      const expectedResult = { status: SUCCESS, results: {} }
      expect(reducer({}, action)).toEqual(expectedResult)
    })

    it('carry over existing state', () => {
      const action = { type: SUCCESS, results: {} }
      const state = { status: LOADING, params: {} }
      const expectedResult = { status: SUCCESS, params: {}, results: {} }
      expect(reducer(state, action)).toEqual(expectedResult)
    })
  })

  describe('FAILURE', () => {
    it('should set the status to FAILURE and error to action.error', () => {
      const action = { type: FAILURE, error: {} }
      const expectedResult = { status: FAILURE, error: {} }
      expect(reducer({}, action)).toEqual(expectedResult)
    })

    it('carry over existing state', () => {
      const action = { type: FAILURE, error: {} }
      const state = { status: LOADING, params: {} }
      const expectedResult = { status: FAILURE, params: {}, error: {} }
      expect(reducer(state, action)).toEqual(expectedResult)
    })
  })

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
