import { useState } from "react";
function App() {
  //useState를 직접적으로 수정하지 않는다! 
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault()
    if(todo===""){
      return;
    }
    setTodo("")
    // 직전의 값을 받아온다. previous function
    setTodos(currentArray => [todo, ... currentArray])
  }
  console.log(todos)
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
    </div>
  );
}

export default App;
