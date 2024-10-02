import Button from "./Button"
import styles from "./App.module.css"
import { useState, useEffect } from "react";
function App() {
  const [counter,setValue] = useState(0); 
  // react. 이라고 적지 않는다. 자동으로 안다.
  const [keyword, setKeyword] = useState("")
  const onClick = () => setValue((point) => point + 1);
  const onChange = (event) => setKeyword(event.target.value);
  // console.log("I run all the ime")
  useEffect(() => {
    console.log("I run only once.")
  }, [])
  //첫번째 인자에는 처음에만 실행되고 나중엔 실행되지 않는 것을 넣어준다.
  useEffect(()=>{
    // if(keyword !=="" && keyword.length > 5){
    //   console.log("Search For", keyword)
    // }
    console.log("I run when 'keyword' changes.")
  },[keyword])
  useEffect(()=>{
    console.log("I run when 'counter' changes.")
  },[counter])
  useEffect(()=>{
    console.log("I run when keyword & counter change")
  },[keyword,counter])
  //keyword가 변화할 때 코드를 실행한다고 react.js에게 알려준다.
  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..."/>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
