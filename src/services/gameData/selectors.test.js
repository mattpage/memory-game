import { NAMESPACE } from './constants'
import { selectStatus, selectResults, selectError } from './selectors'

describe('gameData Service Selectors', () => {
  describe('selectStatus', () => {
    it('should select the status', () => {
      const status = 'SUCCESS'
      const mockedState = {
        [NAMESPACE]: {
          status,
        },
      }

      expect(selectStatus(mockedState)).toBe(status)
    })
  })

  describe('selectResults', () => {
    it('should default to the value of service.results', () => {
      const results = undefined
      const mockedState = {
        [NAMESPACE]: {
          results,
        },
      }
      expect(selectResults(mockedState)).toEqual(results)
    })

    it('should return results', () => {
      const results = [{}, {}]
      const mockedState = {
        [NAMESPACE]: {
          results,
        },
      }
      expect(selectResults(mockedState)).toEqual(results)
      expect(selectResults(mockedState)).toHaveLength(2)
    })
  })

  describe('selectError', () => {
    it('should select the error', () => {
      const error = new Error('Some error')
      const mockedState = {
        [NAMESPACE]: {
          error,
        },
      }

      expect(selectError(mockedState)).toBe(error)
    })
  })
})
