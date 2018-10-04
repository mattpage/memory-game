import { fetchGameData, notAsked, loading, success, failure } from './actions'
import { FETCH_GAME_DATA, NOT_ASKED, LOADING, SUCCESS, FAILURE } from './constants'

describe('gameData Service Actions', () => {
  describe('fetchGameData', () => {
    it('should set the type to FETCH_GAME_DATA and the params', () => {
      const expectedResult = { type: FETCH_GAME_DATA }
      expect(fetchGameData()).toEqual(expectedResult)
    })
  })

  describe('notAsked', () => {
    it('should set the type to NOT_ASKED', () => {
      const expectedResult = { type: NOT_ASKED }
      expect(notAsked()).toEqual(expectedResult)
    })
  })

  describe('loading', () => {
    it('should set the type to LOADING', () => {
      const expectedResult = { type: LOADING }
      expect(loading()).toEqual(expectedResult)
    })
  })

  describe('success', () => {
    it('should set the type to SUCCESS and the results', () => {
      const expectedResult = { type: SUCCESS, results: {} }
      expect(success({})).toEqual(expectedResult)
    })
  })

  describe('failure', () => {
    it('should set the type to FAILURE and the error', () => {
      const expectedResult = { type: FAILURE, error: {} }
      expect(failure({})).toEqual(expectedResult)
    })
  })
})
