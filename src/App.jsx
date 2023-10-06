import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const refPassword = useRef(null);

  const genPass = useCallback(() => {
    let str = "";
    let pass = "";
    str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*(){}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    genPass();
  }, [length, numberAllowed, characterAllowed, genPass]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full font-mono">
        <h1 className="text-center max-w-md mx-auto text-4xl rounded-xl p-3 shadow-lg font text-white bg-slate-900">
          Password Generator
        </h1>
        <div className="max-w-md mx-auto mt-5">
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              ref={refPassword}
              readOnly
            />
            <button
              className="text-white bg-slate-800 p-2 mx-1 rounded-r-lg"
              onClick={(e) => {
                window.navigator.clipboard.writeText(password);
                refPassword.current?.select();
              }}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1 text-white">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer w-15"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              Length: {length}
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                className="cursor-pointer ml-2"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
              : Character
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                className="cursor-pointer ml-2"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              : Number
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
