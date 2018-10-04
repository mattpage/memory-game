import { CARDS_MATCH, CARDS_MISMATCH, CARD_SELECTED, DELETE_GAME, NEW_GAME } from './constants'

export const deleteGame = () => ({
  type: DELETE_GAME,
})

export const newGame = (difficulty, cards) => ({
  difficulty,
  cards,
  type: NEW_GAME,
})

export const cardSelected = id => ({
  id,
  type: CARD_SELECTED,
})

export const cardsMatch = ids => ({
  ids,
  type: CARDS_MATCH,
})

export const cardsMismatch = ids => ({
  ids,
  type: CARDS_MISMATCH,
})
