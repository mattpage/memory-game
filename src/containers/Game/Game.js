import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Game.scss'
import { cardSelected } from './actions'
import { selectAttempts, selectCards, selectDifficulty } from './selectors'
import Timer from '../../components/Timer'
import Card from '../../components/Card'

export class Game extends PureComponent {
  static propTypes = {
    attempts: PropTypes.number.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.id,
        value: PropTypes.string,
        selected: PropTypes.bool,
      })
    ).isRequired,
    difficulty: PropTypes.string.isRequired,
    cardSelected: PropTypes.func,
  }

  static defaultProps = {
    cardSelected,
  }

  constructor(props) {
    super(props)
    this.handleCardClick = this.handleCardClick.bind(this)
  }

  handleCardClick(event) {
    if (event) {
      const cardId = event.target.getAttribute('id')
      this.props.cardSelected(cardId)
    }
  }

  render() {
    const { attempts, cards, difficulty } = this.props
    const cardsRemaining = cards.length
    const timerEnabled = attempts > 0 && cardsRemaining > 0

    if (cardsRemaining < 1) {
      return <p className={styles.gameOver}>Game Over</p>
    }

    return (
      <div className={styles.game}>
        <header className={styles.gameHeader}>
          <dl>
            <dt>Time </dt>
            <dd>
              <Timer enabled={timerEnabled} />
            </dd>
            <dt>Difficulty </dt>
            <dd>{difficulty}</dd>
            <dt>Attempts </dt>
            <dd>{attempts}</dd>
            <dt>Remaining </dt>
            <dd>{cardsRemaining}</dd>
          </dl>
        </header>
        <div
          className={classNames('cards', styles.cards)}
          role="presentation"
          onClick={this.handleCardClick}
        >
          {cards.map(card => <Card key={card.id} {...card} />)}
        </div>
      </div>
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  attempts: selectAttempts(state),
  cards: selectCards(state),
  difficulty: selectDifficulty(state),
})
/* istanbul ignore next */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      cardSelected,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Game)
