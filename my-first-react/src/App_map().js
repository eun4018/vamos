import { useState } from "react";
function App() {
  //useState를 직접적으로 수정하지 않는다!
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }
    // 직전의 값을 받아온다. previous function
    // [todo,currentArray] -> 이렇게 적으면 array안에 또 다른 array가 생겨버림.
    //map() 예전 array를 가져와서 변경해준다. 함수의 첫번째 인자로 현재의 item을 가져올 수 있다. 첫번째 인자의 이름은 무엇이든 상관없다.
    setTodos((currentArray) => [todo, ...currentArray]);
    setTodo("");
  };
  console.log(todos);
  return (
    <div>
      <h1>My To Dos ({todos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={todo}
          type="text"
          placeholder="write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
