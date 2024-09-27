import Button from "./Button"
import styles from "./App.module.css"
import { useState, useEffect } from "react";
function App() {
  const [counter,setValue] = useState(0); 
  // react. 이라고 적지 않는다. 자동으로 안다.
  const onClick = () => setValue((point) => point + 1);
  console.log("I run all the ime")
  useEffect(() => {
    console.log("CAll The Api")
  }, [])
  //첫번째 인자에는 처음에만 실행되고 나중엔 실행되지 않는 것을 넣어준다.
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
