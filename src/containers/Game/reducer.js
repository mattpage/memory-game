import cloneDeep from 'lodash/cloneDeep'
import { CARDS_MATCH, CARDS_MISMATCH, CARD_SELECTED, DELETE_GAME, NEW_GAME } from './constants'

const filterCards = (cards, ids) => cards.filter(card => ids.includes(card.id))
const rejectCards = (cards, ids) => cards.filter(card => !ids.includes(card.id))
const updateCards = (cards, ids, selected) => {
  filterCards(cards, ids).forEach(card => (card.selected = selected))
  return cards
}
const toggleCard = (cards, id) => {
  filterCards(cards, [id]).forEach(card => (card.selected = !card.selected))
  return cards
}

const reducer = (state = {}, action) => {
  let newState
  switch (action.type) {
    case CARDS_MATCH:
      newState = {
        game: {
          ...state.game,
          cards: rejectCards(cloneDeep(state.game.cards), action.ids),
        },
      }
      break
    case CARDS_MISMATCH:
      newState = {
        game: {
          ...state.game,
          cards: updateCards(cloneDeep(state.game.cards), action.ids, false),
        },
      }
      break
    case CARD_SELECTED:
      newState = {
        game: {
          ...state.game,
          cards: toggleCard(cloneDeep(state.game.cards), action.id),
          attempts: state.game.attempts + 1,
        },
      }
      break
    case DELETE_GAME:
      newState = {}
      break
    case NEW_GAME:
      newState = {
        game: {
          difficulty: action.difficulty,
          cards: action.cards,
          attempts: 0,
        },
      }
      break
    default:
      newState = state
  }
  return newState
}

export { default as reducer } from './reducer'
export default reducer
