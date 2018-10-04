import Game from './Game'

export { default as reducer } from './reducer'
export { default as gameFlow } from './sagas'
export { NAMESPACE } from './constants'
export { newGame } from './actions'
export { selectGame } from './selectors'
export default Game
