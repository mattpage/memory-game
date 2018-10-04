import { delay } from 'redux-saga'
import { call, put, select, take } from 'redux-saga/effects'
import { CARD_SELECTED } from './constants'
import { selectCards } from './selectors'
import { cardsMatch, cardsMismatch, deleteGame } from './actions'

export function* gameFlow() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // wait for the user to select a card
    yield take(CARD_SELECTED)

    // get all the cards
    let cards = yield select(selectCards)

    // filter the selected cards
    const selectedCards = cards.filter(card => card.selected)

    // if we have a pair of selected cards
    if (selectedCards.length === 2) {
      // wait a bit and then check for a match
      yield call(delay, 500)
      const ids = selectedCards.map(card => card.id)
      if (selectedCards[0].value === selectedCards[1].value) {
        yield put(cardsMatch(ids))
      } else {
        yield put(cardsMismatch(ids))
      }

      // check to see if there are any more cards left
      // AKA - is the game over
      cards = yield select(selectCards)
      if (cards.length < 1) {
        yield call(delay, 2000)
        yield put(deleteGame())
      }
    }
  }
}

export default [gameFlow()]
