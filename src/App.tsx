import { useState } from "react";

function App() {
  const [limits, setLimits] = useState({ min: 1, max: 4 });
  const [done, setDone] = useState<number[]>([]);

  function getNum() {
    let num = 0;
    while (num === 0 || done.includes(num)) {
      num = Math.floor(
        Math.random() * (limits.max - limits.min + 1) + limits.min
      );
    }
    let temp = "";
    if (num.toString().length > 1) {
      for (let i of num.toString()) {
        temp = temp + i + ", ";
      }
    }
    setDone([...done, num]);
    return temp + num.toString();
  }

  function SpeakMessage() {
    const message = new SpeechSynthesisUtterance();
    message.text = getNum();
    window.speechSynthesis.speak(message);
  }

  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center">
      <ul>
        {done.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      {done.length === limits.max ? (
        <div>All numbers done!</div>
      ) : (
        <button onClick={SpeakMessage} className=" btn">
          Test Button
        </button>
      )}
    </div>
  );
}

export default App;
