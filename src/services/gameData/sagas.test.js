/* eslint-disable redux-saga/yield-effects */
import { take, call, put } from 'redux-saga/effects'
import { FETCH_GAME_DATA } from './constants'
import { fetchGameData, notAsked, loading, success } from './actions'
import { fetchGameDataFlow } from './sagas'

jest.mock('./request', () => params => jest.fn(params))
const request = require('./request')

describe('cards sagas', () => {
  describe('fetchGameDataFlow', () => {
    const gen = fetchGameDataFlow()

    it('should set the initial status to NOT_ASKED', () => {
      expect(gen.next().value).toEqual(put(notAsked()))
    })

    it('should wait for FETCH_GAME_DATA to be dispatched', () => {
      expect(gen.next().value).toEqual(take(FETCH_GAME_DATA))
    })

    it('should set the status to LOADING when it takes a fetchGameData action', () => {
      expect(gen.next(fetchGameData()).value).toEqual(put(loading()))
    })

    it('should call request', () => {
      expect(gen.next().value).toEqual(call(request))
    })

    it('should set the status to SUCCESS upon successful request', () => {
      const results = {
        levels: [{ cards: ['1', '2', '3'], difficulty: 'easy' }],
      }
      expect(gen.next(results).value).toEqual(put(success(results)))
    })

    it('should wait for the next FETCH_GAME_DATA', () => {
      expect(gen.next().value).toEqual(take(FETCH_GAME_DATA))
    })
  })
})
