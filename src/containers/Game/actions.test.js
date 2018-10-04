import { deleteGame, newGame, cardSelected, cardsMatch, cardsMismatch } from './actions'
import { CARDS_MATCH, CARDS_MISMATCH, CARD_SELECTED, DELETE_GAME, NEW_GAME } from './constants'

describe('Game Actions', () => {
  describe('deleteGame', () => {
    it('should set the type to DELETE_GAME', () => {
      const expectedResult = { type: DELETE_GAME }
      expect(deleteGame()).toEqual(expectedResult)
    })
  })

  describe('newGame', () => {
    it('should set the type to NEW_GAME', () => {
      const expectedResult = { type: NEW_GAME }
      expect(newGame()).toEqual(expectedResult)
    })
  })

  describe('cardSelected', () => {
    it('should set the type to CARD_SELECTED', () => {
      const id = '42'
      const expectedResult = { type: CARD_SELECTED, id }
      expect(cardSelected(id)).toEqual(expectedResult)
    })
  })

  describe('cardsMatch', () => {
    it('should set the type to CARDS_MATCH', () => {
      const ids = ['42', '43']
      const expectedResult = { type: CARDS_MATCH, ids }
      expect(cardsMatch(ids)).toEqual(expectedResult)
    })
  })

  describe('cardsMismatch', () => {
    it('should set the type to CARDS_MISMATCH', () => {
      const ids = ['42', '43']
      const expectedResult = { type: CARDS_MISMATCH, ids }
      expect(cardsMismatch(ids)).toEqual(expectedResult)
    })
  })
})
