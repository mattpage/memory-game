import 'babel-polyfill'
import 'core-js/es6/map'
import 'core-js/es6/set'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'

import './App.scss'
import { MENU_ITEMS } from './constants'

import Game, { newGame, selectGame } from '../Game'
import Menu from '../../components/Menu'
import {
  fetchGameData,
  selectResults,
  selectStatus,
  LOADING as GAME_DATA_LOADING,
  NOT_ASKED as GAME_DATA_NOT_ASKED,
} from '../../services/gameData'

export class App extends PureComponent {
  static propTypes = {
    gameData: PropTypes.shape({
      levels: PropTypes.arrayOf(
        PropTypes.shape({
          cards: PropTypes.arrayOf(PropTypes.string),
          difficulty: PropTypes.string,
        })
      ),
    }),
    gameDataStatus: PropTypes.string,
    fetchGameData: PropTypes.func.isRequired,
    hasGame: PropTypes.bool,
    newGame: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gameData: {},
    gameDataStatus: GAME_DATA_NOT_ASKED,
    hasGame: false,
  }

  static loadGameData(data, difficulty = 'easy') {
    const levels = (data.levels || []).filter(level => level.difficulty === difficulty)
    const level = levels.length > 0 ? levels[0] : {}
    const cards = (level.cards || []).map((card, index) => ({
      value: card,
      id: `card-${index}`,
    }))
    return {
      cards,
      difficulty,
    }
  }

  constructor(props) {
    super(props)
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this)
  }

  componentDidMount() {
    this.props.fetchGameData()
  }

  handleMenuItemSelected(menuItem, event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()

      const data = App.loadGameData(this.props.gameData, menuItem.key)
      if (data) {
        const { difficulty, cards } = data
        if (isString(difficulty) && difficulty.length && isArray(cards) && cards.length) {
          this.props.newGame(difficulty, cards)
        }
      }
    }
  }

  render() {
    const { gameDataStatus, hasGame } = this.props

    // if we haven't fetched game data yet or are in the process of doing so...
    if (gameDataStatus === GAME_DATA_LOADING || gameDataStatus === GAME_DATA_NOT_ASKED) {
      return <span>Loading...</span>
    }

    return (
      <div className="app">
        <header>
          <h1>Memory Game</h1>
          {!hasGame && (
            <Menu
              items={MENU_ITEMS}
              label="Select a Game"
              onItemSelected={this.handleMenuItemSelected}
            />
          )}
        </header>
        {hasGame && <Game />}
      </div>
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  gameData: selectResults(state),
  hasGame: Object.keys(selectGame(state)).length > 0,
  gameDataStatus: selectStatus(state),
})

/* istanbul ignore next */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchGameData,
      newGame,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(App)
