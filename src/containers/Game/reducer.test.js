import reducer from './reducer'
import { CARDS_MATCH, CARDS_MISMATCH, CARD_SELECTED, DELETE_GAME, NEW_GAME } from './constants'

describe('Game Reducer', () => {
  describe('CARDS_MATCH', () => {
    it('should remove matching cards', () => {
      const action = { type: CARDS_MATCH, ids: ['1', '2'] }
      const expectedResult = {
        game: {
          difficulty: 'easy',
          cards: [],
        },
      }
      expect(
        reducer(
          {
            game: {
              difficulty: 'easy',
              cards: [{ id: '1' }, { id: '2' }],
            },
          },
          action
        )
      ).toEqual(expectedResult)
    })
  })

  describe('CARDS_MISMATCH', () => {
    it('should deselect mismatched cards', () => {
      const action = { type: CARDS_MISMATCH, ids: ['1', '2'] }
      const expectedResult = {
        game: {
          difficulty: 'easy',
          cards: [{ id: '1', selected: false }, { id: '2', selected: false }],
        },
      }
      expect(
        reducer(
          {
            game: {
              difficulty: 'easy',
              cards: [{ id: '1', selected: true }, { id: '2', selected: true }],
            },
          },
          action
        )
      ).toEqual(expectedResult)
    })
  })

  describe('CARD_SELECTED', () => {
    it('should select cards and increase attempts', () => {
      const action = { type: CARD_SELECTED, id: '1' }
      const expectedResult = {
        game: {
          attempts: 1,
          difficulty: 'easy',
          cards: [{ id: '1', selected: true }, { id: '2', selected: false }],
        },
      }
      expect(
        reducer(
          {
            game: {
              attempts: 0,
              difficulty: 'easy',
              cards: [{ id: '1', selected: false }, { id: '2', selected: false }],
            },
          },
          action
        )
      ).toEqual(expectedResult)
    })
  })

  describe('DELETE_GAME', () => {
    it('should return empty state', () => {
      const action = { type: DELETE_GAME }
      const expectedResult = {}
      expect(reducer({}, action)).toEqual(expectedResult)
    })
  })

  describe('NEW_GAME', () => {
    it('should return new game state', () => {
      const action = {
        type: NEW_GAME,
        difficulty: 'easy',
        cards: [{ id: '1', selected: false }, { id: '2', selected: false }],
      }
      const expectedResult = {
        game: {
          attempts: 0,
          difficulty: 'easy',
          cards: [{ id: '1', selected: false }, { id: '2', selected: false }],
        },
      }
      expect(reducer({}, action)).toEqual(expectedResult)
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
