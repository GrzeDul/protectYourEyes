import React from 'react';
import { render } from 'react-dom';
import { useState, useMemo } from 'react';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const workTime = 1200;
  const intervalTime = 1000;
  const restTime = 20;
  const formatTime = useMemo(
    () => (t) => {
      const minutes = Math.floor(t / 60);
      const seconds = t % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`;
    },
    [time]
  );

  const startTimer = () => {
    setTime(workTime);
    setStatus('work');
    setTimer(
      setInterval(() => {
        setTime((prev) => prev - 1);
      }, intervalTime)
    );
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    setTime(null);
    setStatus('off');
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  if (time === -1) {
    playBell();
    if (status === 'work') {
      setStatus('rest');
      setTime(restTime);
    } else {
      setStatus('work');
      setTime(workTime);
    }
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div className='start-text'>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === 'work' && <img src='./images/work.png' />}
      {status === 'rest' && <img src='./images/rest.png' />}
      {status != 'off' && <div className='timer'>{formatTime(time)}</div>}
      {status === 'off' && (
        <button className='btn' onClick={startTimer}>
          Start
        </button>
      )}
      {status != 'off' && (
        <button className='btn' onClick={stopTimer}>
          Stop
        </button>
      )}
      <button className='btn btn-close' onClick={closeApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
