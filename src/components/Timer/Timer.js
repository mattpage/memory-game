import React from 'react'
import PropTypes from 'prop-types'

import styles from './Timer.scss'

export const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

const Timer = ({ time = 0 }) => <span className={styles.timer}>{formatTime(time)}</span>

Timer.propTypes = {
  time: PropTypes.number,
}

class TimerContainer extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool,
  }

  static defaultProps = {
    enabled: true,
  }

  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.state = {
      secondsElapsed: 0,
    }
  }

  start() {
    this.interval = setInterval(this.tick, 1000)
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  componentDidMount() {
    if (this.props.enabled) {
      this.start()
    }
  }

  componentDidUpdate(prevProps) {
    const { enabled } = this.props
    if (enabled !== prevProps.enabled) {
      if (enabled) {
        this.start()
      } else {
        this.stop()
      }
    }
  }

  componentWillUnmount() {
    this.stop()
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1,
    })
  }

  render() {
    return <Timer time={this.state.secondsElapsed} />
  }
}

export default TimerContainer
