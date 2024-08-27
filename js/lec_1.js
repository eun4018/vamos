function lecture_01() {
  const form = document.querySelector("form");
  const Display = (BMI) => {
    const result = document.querySelector(".result");
    let group;
    if (BMI >= 30.0) {
      group = "중등도 비만";
    } else if (BMI >= 25.0) {
      group = "경도 비만";
    } else if (BMI >= 23.0) {
      group = "과체중";
    } else if (BMI >= 18.5) {
      group = "정상";
    } else {
      group = "저체중";
    }
    result.innerText = `당신의 BMI는 ${BMI}이며 ${group}에 속해있습니다.`;
  };
  const Cal = (Weight, Height) => {
    //BMI 체질량 지수 계산 방법은 체중 (kg) / [키(m)*키(m)]
    return Weight / (Height * Height);
  };

  const formHandler = (event) => {
    event.preventDefault();
    const Height_input = document.querySelector("#height");
    const Weight_input = document.querySelector("#weight");

    if (Weight_input.value !== "" && Height_input.value !== "") {
      const Weight = Weight_input.value;
      const Height = Height_input.value / 100;
      const BMI = Cal(Weight, Height).toFixed(1);
      //toFixed(digits) : 숫자를 소수점 이하 digits 자릿수까지 반올림하여 문자열로 반환
      //toPrecision(digits) : 숫자를 전체 자릿수 digits로 반올림하여 문자열로 반환
      Display(BMI);
      Weight_input.value = ""; // 값을 비워준다.
      Height_input.value = "";
    }
  };

  form.addEventListener("submit", formHandler);
}
function lecture_02() {
  const hour = document.querySelector(".hour");
  const min = document.querySelector(".min");
  const sec = document.querySelector(".sec");
  function clock() {
    const now = new Date();
    hour.innerText = String(now.getHours()).padStart(2, "0");
    min.innerText = String(now.getMinutes()).padStart(2, "0");
    sec.innerText = String(now.getSeconds()).padStart(2, "0");
  }
  //무한반복 해주는 함수
  setInterval(clock, 1000);
  clock(); // 한번더 불러야 0000표시가 안나옴

  //** stopWatch **//

  const startBtn = document.querySelector(".start");
  const stopBtn = document.querySelector(".stop");
  const clearBtn = document.querySelector(".reset");

  let timerId;
  let [Msec, Sec, Min] = [0, 0, 0]; // 구조분해 할당

  const displaytimer = () => {
    const Time = document.querySelector(".Time");
    // 템플릿 리터럴
    const Fmin = Min < 10 ? `0${Min}` : Min;
    const Fsec = Sec < 10 ? `0${Sec}` : Sec;
    const Fmsec = Msec < 10 ? `0${Msec}` : Msec;

    Time.innerText = `${Fmin} : ${Fsec} : ${Fmsec}`;
  };
  const timer = () => {
    Msec++; // 0.01초씩 증가 100이 되면 1초가 되고 101이 되면 2초
    if (Msec == 100) {
      Msec = 0;
      Sec++;
      if (Sec == 60) {
        Sec = 0;
        Min++;
      }
    }
    displaytimer();
  };
  const start = () => {
    event.preventDefault();
    timerId = setInterval(timer, 10);
  };
  const stop = () => {
    clearInterval(timerId);
  };
  const reset = () => {
    stop();
    [Msec, Sec, Min] = [0, 0, 0];
    displaytimer();
  };

  startBtn.addEventListener("click", start);
  stopBtn.addEventListener("click", stop);
  clearBtn.addEventListener("click", reset);
}
function lecture_03() {
  const images = document.querySelectorAll(".item");
  const Prev = document.querySelector(".prev");
  const Next = document.querySelector(".next");
  const Img_update = () => {
    images.forEach((img) => {
      img.classList.remove("show");
    });
    images[index].classList.add("show");
  };
  let index = 0;
  let LastIndex = images.length - 1;
  const moveToPrev = () => {
    if (index == 0) {
      index = LastIndex;
    } else {
      index--;
    }
    Img_update();
  };
  const moveToNext = () => {
    if (index == LastIndex) {
      index = 0;
    } else {
      index++;
    }
    Img_update();
  };
  Prev.addEventListener("click", moveToPrev);
  Next.addEventListener("click", moveToNext);
}
function lecture_04(){
  const Button = document.querySelector(".open");
  const Container = document.querySelector(".modal-container");
  const Body = document.querySelector("body");
  Button.addEventListener("click", () => {
    Container.classList.add("show");
    console.log('dkdsafdlk')
    Body.classList.add("overflow");
  })
  const Close = document.querySelector(".close")
  Close.addEventListener("click",()=>{
    Container.classList.remove("show")
    Body.classList.remove("overflow")
  })
}
function lecture_05(){
    const buttons = document.querySelectorAll(".rcp");
    const result = ["가위", "바위", "보"];
    const computerChoice = document.querySelector(".computer-choice");
    const userChoice = document.querySelector(".user-choice");
    const winner = document.querySelector(".block-result");
    const show = (user, computer, result) => {
      userChoice.innerText = user;
      computerChoice.innerText = computer;
      winner.innerText = result;
    }
    const Game = (user, computer) => {
      let winMessage;
      if (user == computer) {
        winMessage = "무승부";
      } else {
        switch (user + computer) {
          // 가위보, 바위가위, 보바위 -> 사용자 윈
          // 가위바위, 바위보, 보가위 -> 컴퓨터 윈
          case "가위보":
          case "바위가위":
          case "보바위":
            winMessage = "사용자 승리!";
            break; // case가 참일때까지 실행

          case "가위바위":
          case "바위보":
          case "보가위":
            winMessage = "컴퓨터 승리!";
            break;
        }
      }
      show(user, computer, winMessage)

    }
    const play = (event) => {
      const user = event.target.innerText;
      const randomIndex = Math.floor(Math.random() * 3);
      const computer = result[randomIndex];
      Game(user, computer,result);
    }
    buttons.forEach((btn) => {
      btn.addEventListener("click", play)
    })
    //Math.ramdom()*3 표현하고 싶은 숫자 범위 전까지
    //floor() 함수 정수 밑에 자리는 무조건 버린다.
    Math.random(Math.random() * 3)
}
function lecture_06(){
  const Parent = document.getElementById("sub_lec_6");
  const Form = Parent.querySelector("form");
  const Input = Parent.querySelector("input");
  const Lists = document.createElement("ul"); /*선택자 이슈로 변경*/
  Parent.appendChild(Lists);
  let todos = [];
  const Save = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    //JSON.stringify 자바스크립트 객체 -> 문자열로 변경
  };

  const delItem = (event) => {
    //console.dir(event.target) // parentNode, parentElement파악 가능
    const Target = event.target.parentElement;
    // todos = todos.filter((todo) => todo.id != Target.id)
    // !=서로 형타입은 다르지만 비교 가능
    todos = todos.filter((todo) => todo.id !== parseInt(Target.id)); // 문자열을 숫자로
    Save();
    Target.remove();
  };
  const addItem = (todo) => {
    if (todo.text !== "") {
      const child_li = document.createElement("li");
      const button = document.createElement("button");
      const span = document.createElement("span");

      span.innerText = todo.text;
      button.innerText = "❌";
      button.addEventListener("click", delItem);
      // List.appendChild(child_li);
      // Parent.appendChild(Lists);
      child_li.appendChild(span);
      child_li.appendChild(button);
      Lists.appendChild(child_li);
      //     const para = document.createElement("p");
      // para.innerHTML = "This is a paragraph.";
      // document.getElementById("myDIV").appendChild(para);
      child_li.id = todo.id;
    }
  };
  const Handler = (event) => {
    event.preventDefault();
    const todo = {
      id: Date.now(),
      text: Input.value,
    };
    todos.push(todo);
    Save();
    addItem(todo);
    Input.value = "";
  };
  //기존에 저장된 할일이 있다면 불러오기
  const init = () => {
    // const userTodos = localStorage.getItem("todos");
    const userTodos = JSON.parse(localStorage.getItem("todos"));
    console.log(userTodos);
    //객체 형태로 파싱
    if (userTodos) {
      userTodos.forEach((todo) => {
        addItem(todo);
      });
      todos = userTodos;
    }
  };
  Form.addEventListener("submit", Handler);
  init();
}
lecture_01();
lecture_02();
lecture_03();
lecture_04();
lecture_05();
lecture_06()

function main_Lec_02(){
  const video = document.querySelector("video");
  const playButton = document.querySelector(".play-pause > span");
  const rateButtons = document.querySelectorAll(".rate");
  const volumeBar = document.querySelector("input");
  const updateProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    const progressBar = document.querySelector(".bar");
    progressBar.style.width = `${percent}%`;
  
    if (video.ended) {
      pause();
    }
  }
  const formatting = (time) => {
    const Sec = Math.floor(time % 60);
    const Min = Math.floor(time / 60) % 60;
    const Hour = Math.floor(time / 3600);
  
    const fsec = Sec < 10 ? `0${Sec}` : Sec;
    const fmin = Min < 10 ? `0${Min}` : Min;
    const fhour = Hour < 10 ? `0${Hour}` : Hour;
  
    return `${fhour}:${fmin}:${fsec}`;
  }
  const updateTime = () => {
    const current = document.querySelector(".current");
    const duration = document.querySelector(".duration"); // duration부분을 계속 업뎃필요없음
    current.innerText = formatting(video.currentTime);
    duration.innerText = formatting(video.duration);
  }
  const setVolume = (event) => {
    //0부터 1까지의 값
    video.volume = event.target.value;
  }
  const setRate = (event) => {
    const { rate } = event.target.dataset; // 구조분해할당 ES6 
    video.playbackRate = rate;
  }
  
  const play = () => {
    playButton.innerHTML = '||';
    video.play();
  }
  const pause = () => {
    playButton.innerHTML = '▶';
    video.pause();
  }
  
  const togglePlay = () => {
    //삼항 연산자 사용
    video.paused ? play() : pause();
  }

  playButton.addEventListener("click", togglePlay);
  rateButtons.forEach((button) => {
    button.addEventListener("click", setRate);
  });
  
  volumeBar.addEventListener("change", setVolume);
  video.addEventListener("timeupdate", updateTime);
  video.addEventListener("timeupdate", updateProgress);
}

main_Lec_02()