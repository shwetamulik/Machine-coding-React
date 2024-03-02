import { useEffect, useState } from 'react';

import './App.css';
const calculateRemainingTime = (targetTime: Date) => {
  console.log(targetTime);
  let currentTime = new Date();
  const calculated = Math.floor(
    targetTime.getTime() / 1000 - currentTime.getTime() / 1000
  );
  return calculated;
};

const useRemainingTime = (targetDate: Date) => {
  const [remainingTime, setRemainingTime] = useState(() =>
    calculateRemainingTime(targetDate)
  );
  useEffect(() => {
    const timerId = setInterval(() => {
      const remainingTimeNow = calculateRemainingTime(targetDate);
      setRemainingTime(remainingTimeNow);
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return remainingTime;
};

const TimeComponent = (props: any) => {
  console.log('props', props);
  const remainingTime = useRemainingTime(props.targetTime);

  return (
    <>
      <p>Remaining time: {remainingTime} </p>
    </>
  );
};
function App() {
  // const targetTime = new Date('2024-03-03');
  const [time, setTime] = useState(new Date('2024-03-03'));
  const handleDateChange = (e: any) => {
    setTime(new Date(e?.target?.value));
  };
  return (
    <>
      <p>Select Target Date:</p>
      <input
        type="date"
        id="start"
        name="trip-start"
        value="2024-03-02"
        min="2024-03-03"
        max="2024-03-10"
        onChange={handleDateChange}
      />
      <TimeComponent targetTime={time} />
    </>
  );
}

export default App;
