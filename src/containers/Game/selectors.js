import { createSelector } from 'reselect/lib'
import { NAMESPACE } from './constants'

const selectNamespace = state => state[NAMESPACE] || {}
export const selectGame = createSelector(selectNamespace, namespace => namespace.game || {})
export const selectCards = createSelector(selectGame, game => game.cards || [])
export const selectDifficulty = createSelector(selectGame, game => game.difficulty || '')
export const selectAttempts = createSelector(
  selectGame,
  game => (isNaN(game.attempts) ? 0 : game.attempts)
)
