//trello app
function main_Lec_05(){
  const Parent_ID = document.getElementById("lecture_5")
  const form = Parent_ID.querySelector("form");
  const blocks = Parent_ID.querySelectorAll(".memo");
  let from, to; //from-출발, to-도착
  let todoList = [], doingList = [], doneList = [];
  const lists = {
    ToDo: todoList,
    doing: doingList,
    done: doneList,
  }
  const dragOver = (event) => {
    event.preventDefault();
    const { id: targetId } = event.target;
    const listIds = Object.keys(lists) //  직접 찾은 열거 가능한 문자열 키 속성 이름에 해당하는 문자열을 요소로 하는 배열을 반환
    console.log( listIds)
    if (listIds.includes(targetId)) {
      // id값이 포함되어 있는지 확인
      to = targetId;
    }
  }

  const saveList = (listId) => {
    //setItem(keyName, keyValue)
    localStorage.setItem(listId, JSON.stringify(lists[listId]))
  }
  const dragStart = (event) => {
    from = event.target.parentElement.id;
    to = from;
  };
  const dragEnd = (event) => {
    const { id } = event.target;
    if (from === to) {
      return;
    }
    event.target.remove();
    lists[from] = lists[from].filter((ToDo) => {
      if (ToDo.id !== id) {
        return ToDo;
      } else {
        createElement(to, ToDo);
      }
    });
    saveList(from); //출발 리스트
    saveList(to); // 도착리스트
  };

  const loadList = () => {
    const userTodoList = JSON.parse(localStorage.getItem("ToDo")) //자바스크립트 객체로 가져온다.
    const userDoingList = JSON.parse(localStorage.getItem("doing"))
    const userDoneList = JSON.parse(localStorage.getItem("done"))
    if (userTodoList) {
      userTodoList.forEach((ToDo) => {
        createElement("ToDo", ToDo)
      })
    }
    if (userDoingList) {
      userDoingList.forEach((doing) => {
        createElement("doing", doing)
      })
    }
    if (userDoneList) {
      userDoneList.forEach((done) => {
        createElement("done", done)
      })
    }
  }
  const removeTodo = (event) => {
    event.preventDefault(); // 바로 오른쪽 클릭창 뜨지 않도록
    const { id } = event.target;
    const { id: listId } = event.target.parentElement;
    event.target.remove();
    lists[listId] = lists[listId].filter((ToDo) => {
      return ToDo.id !== id;
    })

    saveList(listId)
  }
  const createElement = (listId, ToDo) => {
    const list = document.querySelector(`#${listId}`);
    const item = document.createElement("div");//vscode-app/c:/Program%20Files%20(x86)/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html
    item.id = ToDo.id;
    item.innerText = ToDo.text;
    item.className = 'item';
    item.draggable = true; //html을 drag되게 해주는 요소
    list.append(item);

    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
    item.addEventListener("contextmenu", removeTodo)
    //contextmenu 마우스 오른쪽 클릭이벤트
    lists[listId].push(ToDo);
    // savsList(listId); 
    // 반복적으로 저장이 됨.
  }
  const createTodo = (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const id = uuidv4();
    //UUID 범용 고유 식별자(Universally Unique Identifier, UUID) 
    //버전마다 ID 생성규칙이 조금씩 다름 https://github.com/uuidjs/uuid uuid cdn검색 사용!

    const newTodo = {
      id,
      text: input.value,
    }
    createElement("ToDo", newTodo);
    input.value = "";
    //새로운 객체를 만들때만 저장하도록 넣어준다.
    saveList("ToDo");
  }
  loadList();
  form.addEventListener("submit", createTodo);
  blocks.forEach((memo) => {
    memo.addEventListener("dragover", dragOver)
  })
}
main_Lec_05()