const Parent = document.getElementById("sub_lec_6")
const Form = Parent.querySelector("form");
const Input = Parent.querySelector("input");
const List = Parent.querySelector(" ul");
let todos = [];

const Save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  //JSON.stringify 자바스크립트 객체 -> 문자열로 변경
}

const delItem = (event) => {
  //console.dir(event.target) // parentNode, parentElement파악 가능
  const Target = event.target.parentElement;
  // todos = todos.filter((todo) => todo.id != Target.id)
  // !=서로 형타입은 다르지만 비교 가능
  todos = todos.filter((todo) => todo.id !== parseInt(Target.id)) // 문자열을 숫자로
  Save();
  Target.remove();
}
const addItem = (todo) => {
  if (todo.text !== "") {
    const child_li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    span.innerText = todo.text;
    button.innerText = '❌';
    button.addEventListener("click", delItem)
    List.appendChild(child_li);
    child_li.appendChild(span);
    child_li.appendChild(button);
    List.appendChild(child_li);
//     const para = document.createElement("p");
// para.innerHTML = "This is a paragraph.";
// document.getElementById("myDIV").appendChild(para);
    child_li.id = todo.id;
  }
}
const Handler = (event) => {
  event.preventDefault();
  const todo = {
    id: Date.now(),
    text: Input.value
  };
  todos.push(todo);
  Save();
  addItem(todo);
  Input.value = '';
}
//기존에 저장된 할일이 있다면 불러오기
const init = () => {
  // const userTodos = localStorage.getItem("todos");
  const userTodos = JSON.parse(localStorage.getItem("todos"));
  console.log(userTodos)
  //객체 형태로 파싱
  if (userTodos) {
    userTodos.forEach((todo) => {
      addItem(todo);
    })
    todos = userTodos;
  }
}
Form.addEventListener("submit", Handler)
init();