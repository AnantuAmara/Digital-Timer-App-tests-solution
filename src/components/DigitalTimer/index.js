// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimeRunning: false,
  timerLimitInMinute: 25,
  timerLimitInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  renderTimerPauseAndPlay = () => {
    const {isTimeRunning} = this.state

    const isStartOrPauseImgUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const isStartOrPauseAltTExt = isTimeRunning ? 'Pause icon' : 'Play icon'

    return (
      <div className="pause-play-reset-image-container">
        <button
          type="button"
          className="icon-button"
          onClick={this.startOrPauseTimer}
        >
          <img
            src={isStartOrPauseImgUrl}
            alt={isStartOrPauseAltTExt}
            className="icon"
          />
          <p className="pause-or-play-text">
            {isTimeRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button type="button" className="icon-button" onClick={this.resetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon"
          />
          <p className="pause-or-play-text">Reset</p>
        </button>
      </div>
    )
  }

  startOrPauseTimer = () => {
    const {isTimeRunning, timerLimitInMinute, timerLimitInSeconds} = this.state
    const isTimerCompleted = timerLimitInSeconds === timerLimitInMinute * 60
    if (isTimerCompleted) {
      this.setState({timerLimitInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  incrementTimerElapsedInSeconds = () => {
    const {timerLimitInMinute, timerLimitInSeconds} = this.state
    const isTimerCompleted = timerLimitInSeconds === timerLimitInMinute * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timerLimitInSeconds: prevState.timerLimitInSeconds + 1,
      }))
    }
  }

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderPlusAndMinusControl = () => {
    const {timerLimitInMinute, timerLimitInSeconds} = this.state
    const disableBtn = timerLimitInSeconds > 0

    return (
      <div className="Timer-limit-control-container">
        <p className="set-timer-text">Set Timer Limit</p>
        <div className="plus-and-minus-container">
          <button
            type="button"
            className="limit-control-button"
            onClick={this.onDecrementTimerLimitInMinutes}
            disabled={disableBtn}
          >
            -
          </button>
          <div>
            <p className="limit-control-text">{timerLimitInMinute}</p>
          </div>
          <button
            type="button"
            className="limit-control-button"
            onClick={this.onIncrementTimerLimitInMinutes}
            disabled={disableBtn}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onDecrementTimerLimitInMinutes = () => {
    const {timerLimitInMinute} = this.state
    if (timerLimitInMinute > 1) {
      this.setState(prevState => ({
        timerLimitInMinute: prevState.timerLimitInMinute - 1,
      }))
    }
  }

  onIncrementTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinute: prevState.timerLimitInMinute + 1,
    }))
  }

  getTimerFormat = () => {
    const {timerLimitInMinute, timerLimitInSeconds} = this.state
    const totalRemainingSeconds = timerLimitInMinute * 60 - timerLimitInSeconds
    const minute = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minute > 9 ? minute : `0${minute}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const format = this.getTimerFormat()
    const labelText = isTimeRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-image-container">
          <div className="time-running-container">
            <div className="timer-container">
              <h1>{format}</h1>
              <p>{labelText}</p>
            </div>
          </div>
          <div className="timer-control-container">
            {this.renderTimerPauseAndPlay()}
            {this.renderPlusAndMinusControl()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
