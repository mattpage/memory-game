/* eslint-disable redux-saga/yield-effects */
import { take, call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { CARD_SELECTED } from './constants'
import { selectCards } from './selectors'
import { cardSelected, cardsMatch, cardsMismatch, deleteGame } from './actions'
import { gameFlow } from './sagas'

describe('Game sagas', () => {
  describe('gameFlow', () => {
    describe('matching cards', () => {
      const gen = gameFlow()

      it('should wait for CARD_SELECTED to be dispatched', () => {
        expect(gen.next().value).toEqual(take(CARD_SELECTED))
      })

      it('should select the cards when it takes a cardSelected action', () => {
        expect(gen.next(cardSelected('1')).value).toEqual(select(selectCards))
      })

      it('should wait for another card to be selected', () => {
        expect(
          gen.next([
            { id: '1', value: '1', selected: true },
            { id: '2', value: '1', selected: false },
          ]).value
        ).toEqual(take(CARD_SELECTED))
      })

      it('should select the cards when it takes a cardSelected action', () => {
        expect(gen.next(cardSelected('2')).value).toEqual(select(selectCards))
      })

      it('should delay a bit after receiving two selected cards', () => {
        expect(
          gen.next([
            { id: '1', value: '1', selected: true },
            { id: '2', value: '1', selected: true },
          ]).value
        ).toEqual(call(delay, 500))
      })

      it('should dispatch a cardMatch action if the cards match', () => {
        expect(gen.next().value).toEqual(put(cardsMatch(['1', '2'])))
      })

      it('should select the cards again', () => {
        expect(gen.next().value).toEqual(select(selectCards))
      })

      it('should go back to waiting for CARD_SELECTED to be dispatched if there are more cards', () => {
        expect(gen.next([{}]).value).toEqual(take(CARD_SELECTED))
      })
    })

    describe('mismatching cards', () => {
      const gen = gameFlow()

      it('should wait for CARD_SELECTED to be dispatched', () => {
        expect(gen.next().value).toEqual(take(CARD_SELECTED))
      })

      it('should select the cards when it takes a cardSelected action', () => {
        expect(gen.next(cardSelected('1')).value).toEqual(select(selectCards))
      })

      it('should wait for another card to be selected', () => {
        expect(
          gen.next([
            { id: '1', value: '1', selected: true },
            { id: '2', value: '2', selected: false },
          ]).value
        ).toEqual(take(CARD_SELECTED))
      })

      it('should select the cards when it takes a cardSelected action', () => {
        expect(gen.next(cardSelected('2')).value).toEqual(select(selectCards))
      })

      it('should delay a bit after receiving two selected cards', () => {
        expect(
          gen.next([
            { id: '1', value: '1', selected: true },
            { id: '2', value: '2', selected: true },
          ]).value
        ).toEqual(call(delay, 500))
      })

      it('should dispatch a cardMismatch action since the cards do not match', () => {
        expect(gen.next().value).toEqual(put(cardsMismatch(['1', '2'])))
      })

      it('should select the cards again', () => {
        expect(gen.next().value).toEqual(select(selectCards))
      })

      it('should delay a bit if there are no more cards', () => {
        expect(gen.next([]).value).toEqual(call(delay, 2000))
      })

      it('should dispatch a deleteGame action', () => {
        expect(gen.next().value).toEqual(put(deleteGame()))
      })
    })
  })
})
