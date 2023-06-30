import { useEffect, useState } from 'react';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>Live Clock</h1>
      <div>
        <p>Current Time: {currentTime.toLocaleTimeString()}</p>
        <p>Current Date: {formatDate(currentTime)}</p>
        <p>Current Day: {currentTime.toLocaleDateString(undefined, { weekday: 'long' })}</p>
      </div>
    </div>
  );
}

export default Clock;

