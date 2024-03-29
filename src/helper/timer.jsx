import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, timeLeft: 0, onlyHours: false };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs, onlyHours) {
    // console.log('these are seconds',secs,onlyHours);
    var endTime = secs;
    var now = new Date().getTime() / 1000,
      timeLeft = secs - now,
      days = Math.floor(timeLeft / 86400);
    // hours = Math.floor((timeLeft - 86400 * days) / 3600),
    // minutes = Math.floor((timeLeft - 86400 * days - 3600 * hours) / 60),
    // seconds = Math.floor(
    //   timeLeft - 86400 * days - 3600 * hours - 60 * minutes
    // );
    let hours = Math.floor((timeLeft - 86400 * days) / 3600);
    if (onlyHours) {
      hours = Math.floor((timeLeft - 86400 * days) / 3600) + days * 24;
    }
    let divisor_for_minutes = timeLeft % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let obj = {
      d: days >= 10 ? days : `0${days}`,
      h: hours >= 10 ? hours : `0${hours}`,
      m: minutes >= 10 ? minutes : `0${minutes}`,
      s: seconds >= 10 ? seconds : `0${seconds}`,
    };
    return obj;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.timeLeft !== prevProps.timeLeft) {
      const timeLeft = this.props.timeLeft;
      const onlyHours = this.props.onlyHours;
      this.setState({ timeLeft, onlyHours });
      let timeLeftVar = this.secondsToTime(timeLeft, onlyHours);
      this.setState({ time: timeLeftVar }, () => {
        this.startTimer();
      });
    }
  }
  componentDidMount() {
    const timeLeft = this.props.timeLeft;
    const onlyHours = this.props.onlyHours;
    this.setState({ timeLeft, onlyHours });
    let timeLeftVar = this.secondsToTime(timeLeft, onlyHours);
    this.setState({ time: timeLeftVar }, () => {
      this.startTimer();
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({ time: {}, timeLeft: 0 });
  }
  startTimer() {
    if (this.timer === 0 && this.state.timeLeft > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let timeLeft = this.state.timeLeft;
    this.setState({
      time: this.secondsToTime(timeLeft, this.state.onlyHours),
      timeLeft: timeLeft,
    });

    // Check if we're at zero.
    if (timeLeft === 0) {
      clearInterval(this.timer);
    }
  }

  displayTime = () => {
    let time = this.state.time
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = 0

    if (time.d) days = Number(((time.d).toString()).split('-').pop())
    if (time.h) hours = Number(time.h)
    if (time.m) minutes = Number(((time.m).toString()).split('-').pop())
    if (time.s) seconds = Number(((time.s).toString()).split('-').pop())

    if (days > 0) return days+' days left'
    else return hours+':'+minutes+':'+seconds
    // else if (hours > 0) return hours+' hours left'
    // else if (minutes > 0) return minutes+' minutes left'
    // else if (seconds > 0) return seconds+' seconds left'
    // else return 'ending soon'
  }


  render() {
    return (
      <>
        {this.displayTime()}
      </>
    )
    // return this.props.isDetailed ? (
    //   <>
    //     <div className='time-block'>
    //       <h3>{this.state.time.h}</h3>
    //       <p className='gray-t'>hours</p>
    //     </div>
    //     <div className='time-block'>
    //       <h3>{this.state.time.m}</h3>
    //       <p className='gray-t'>minutes</p>
    //     </div>
    //     <div className='time-block'>
    //       <h3>{this.state.time.s}</h3>
    //       <p className='gray-t'>seconds</p>
    //     </div>
    //   </>
    // ) : (
    //   <>
    //     {this.state.time.h}h {this.state.time.m}m {this.state.time.s}s
    //   </>
    // );
  }
}

export default Timer;
