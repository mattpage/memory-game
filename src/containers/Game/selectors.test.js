import { NAMESPACE } from './constants'
import { selectGame, selectCards, selectDifficulty, selectAttempts } from './selectors'

describe('Game Selectors', () => {
  describe('selectGame', () => {
    it('should select the Game', () => {
      const game = { difficulty: 'easy', cards: [] }
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectGame(mockedState)).toBe(game)
    })
    it('should return an empty object if there is no Game', () => {
      const game = {}
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectGame(mockedState)).toBe(game)
    })
  })

  describe('selectCards', () => {
    it('should select the cards', () => {
      const game = { difficulty: 'easy', cards: [{}, {}] }
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectCards(mockedState)).toBe(game.cards)
    })
    it('should return an empty array if there are no Cards', () => {
      const game = {}
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectCards(mockedState)).toEqual([])
    })
  })

  describe('selectDifficulty', () => {
    it('should select the difficulty', () => {
      const game = { difficulty: 'easy', cards: [{}, {}] }
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectDifficulty(mockedState)).toBe(game.difficulty)
    })
    it('should return an empty string if there is no difficulty', () => {
      const game = {}
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectDifficulty(mockedState)).toEqual('')
    })
  })

  describe('selectAttempts', () => {
    it('should select the number of attempts', () => {
      const game = { difficulty: 'easy', cards: [{}, {}], attempts: 42 }
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectAttempts(mockedState)).toBe(game.attempts)
    })
    it('should return 0 if there have been no attempts', () => {
      const game = {}
      const mockedState = {
        [NAMESPACE]: {
          game,
        },
      }
      expect(selectAttempts(mockedState)).toEqual(0)
    })
  })
})
