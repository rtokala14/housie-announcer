import { useState } from "react";

function App() {
  const [limits, setLimits] = useState({ min: 1, max: 90 });
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
    <div className=" h-screen w-screen flex flex-col items-center">
      <h1 className=" mt-16 flex gap-3 items-center">
        <span className=" text-xl">Announcing numbers between</span>
        <span className=" text-2xl font-bold">{limits.min}</span>
        <span className=" text-xl">and</span>
        <span className=" text-2xl font-bold">{limits.max}</span>
      </h1>
      <div className="h-full w-screen flex items-center justify-evenly">
        <div className=" w-2/5 gap-3 min-h-16 py-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center">
          <h2 className=" text-xl font-bold">Last 5 numbers</h2>
          <ul className=" flex flex-col gap-3">
            {done.slice(-5, done.length).map((num) => (
              <li
                key={num}
                className=" text-2xl p-4 px-6 rounded-full bg-slate-300"
              >
                {num}
              </li>
            ))}
          </ul>
        </div>
        {done.length === limits.max ? (
          <button className=" btn-disabled text-black p-3 rounded-md">
            All numbers done!
          </button>
        ) : (
          <>
            <button onClick={SpeakMessage} className=" btn">
              Next number
            </button>
            {/* <span>Click button or press Enter</span> */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
