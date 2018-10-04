import { FAILURE, FETCH_GAME_DATA, LOADING, NOT_ASKED, SUCCESS } from './constants'

export const failure = error => ({
  type: FAILURE,
  error,
})

export const fetchGameData = () => ({
  type: FETCH_GAME_DATA,
})

export const loading = () => ({
  type: LOADING,
})

export const notAsked = () => ({
  type: NOT_ASKED,
})

export const success = results => ({
  type: SUCCESS,
  results,
})
