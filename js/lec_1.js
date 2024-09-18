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
  const Parent_img = document.querySelector("#sub_lec_3");
  const images = Parent_img.querySelectorAll(".item");
  const Prev = Parent_img.querySelector(".prev");
  const Next = Parent_img.querySelector(".next");
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
function lecture_04() {
  const Button = document.querySelector(".open");
  const Container = document.querySelector(".modal-container");
  const Body = document.querySelector("body");
  Button.addEventListener("click", () => {
    Container.classList.add("showed");
    Body.classList.add("overflow");
  });
  const Close = document.querySelector(".close");
  Close.addEventListener("click", () => {
    Container.classList.remove("showed");
    Body.classList.remove("overflow");
  });
}
function lecture_05() {
  const buttons = document.querySelectorAll(".rcp");
  const result = ["가위", "바위", "보"];
  const computerChoice = document.querySelector(".computer-choice");
  const userChoice = document.querySelector(".user-choice");
  const winner = document.querySelector(".block-result");
  const show = (user, computer, result) => {
    userChoice.innerText = user;
    computerChoice.innerText = computer;
    winner.innerText = result;
  };
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
    show(user, computer, winMessage);
  };
  const play = (event) => {
    const user = event.target.innerText;
    const randomIndex = Math.floor(Math.random() * 3);
    const computer = result[randomIndex];
    Game(user, computer, result);
  };
  buttons.forEach((btn) => {
    btn.addEventListener("click", play);
  });
  //Math.ramdom()*3 표현하고 싶은 숫자 범위 전까지
  //floor() 함수 정수 밑에 자리는 무조건 버린다.
  Math.random(Math.random() * 3);
}
function lecture_06() {
  const Parent = document.querySelector(".container.todo");
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
    // console.log(userTodos);
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
lecture_06();

function main_Lec_02() {
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
  };
  const formatting = (time) => {
    const Sec = Math.floor(time % 60);
    const Min = Math.floor(time / 60) % 60;
    const Hour = Math.floor(time / 3600);

    const fsec = Sec < 10 ? `0${Sec}` : Sec;
    const fmin = Min < 10 ? `0${Min}` : Min;
    const fhour = Hour < 10 ? `0${Hour}` : Hour;

    return `${fhour}:${fmin}:${fsec}`;
  };
  const updateTime = () => {
    const current = document.querySelector(".current");
    const duration = document.querySelector(".duration"); // duration부분을 계속 업뎃필요없음
    current.innerText = formatting(video.currentTime);
    duration.innerText = formatting(video.duration);
  };
  const setVolume = (event) => {
    //0부터 1까지의 값
    video.volume = event.target.value;
  };
  const setRate = (event) => {
    const { rate } = event.target.dataset; // 구조분해할당 ES6
    video.playbackRate = rate;
  };

  const play = () => {
    playButton.innerHTML = "||";
    video.play();
  };
  const pause = () => {
    playButton.innerHTML = "▶";
    video.pause();
  };

  const togglePlay = () => {
    //삼항 연산자 사용
    video.paused ? play() : pause();
  };

  playButton.addEventListener("click", togglePlay);
  rateButtons.forEach((button) => {
    button.addEventListener("click", setRate);
  });

  volumeBar.addEventListener("change", setVolume);
  video.addEventListener("timeupdate", updateTime);
  video.addEventListener("timeupdate", updateProgress);
}

main_Lec_02();

function main_Lec_03_1() {
  const Parent_Draw = document.querySelector(
    "#lecture_3 .sub.sub2:first-child"
  );
  const canvas = Parent_Draw.querySelector("canvas");
  const color = Parent_Draw.querySelector("#color");
  const Width = Parent_Draw.querySelector("#width");
  const clear = Parent_Draw.querySelector(".clear");
  const save = Parent_Draw.querySelector(".save");

  const ctx = canvas.getContext("2d"); // 그림을 그릴수 있게 된다.
  ctx.fillStyle = "white"; // 저장 캔버스 배경 흰색
  ctx.fillRect(0, 0, canvas.width, canvas.height); // 범위 지정 필요
  let isPainting = false;
  let lineWidth = 5;
  //clear 버튼 관련
  clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //x,y,캔버스 가로, 캔버스 세로
  });
  //컬러값변경
  color.addEventListener("change", (event) => {
    // console.log(event.target.value)
    ctx.strokeStyle = event.target.value;
  });

  //선의 굵기 선택관련 (Width)
  Width.addEventListener("change", (event) => {
    lineWidth = event.target.value; // number type 5, 10;
  });

  // 마우스 클릭시, 첫 시작
  canvas.addEventListener("mousedown", (event) => {
    isPainting = true; // 그림그리고 있는 중을 나타냄
    ctx.beginPath(); // 새로운 경로를 생성
    ctx.moveTo(event.offsetX, event.offsetY);
    //지정된 위치로 이동
  });

  // 마우스로 그릴 때
  canvas.addEventListener("mousemove", (event) => {
    // console.log(event);
    if (!isPainting) {
      //클릭을 뗏다면 바로 리턴하도록
      return;
    }
    ctx.lineWidth = lineWidth; // 시스템의 linewidth를 전역변수 lineWidth로 지정.
    ctx.lineCap = "round"; //선의 끝부분을 지정;
    ctx.lineTo(event.offsetX, event.offsetY);
    // 이전경로부터 지정된 경로까지 선을 그리는 메소드 - 실제로 하진 않는다.
    ctx.stroke(); // 그래서 요게 필요하다.
  });
  // 마우스가 캔버스를 벗어나면
  canvas.addEventListener("mouseout", (event) => {
    isPainting = false;
  });
  // 마우스 클릭 종료
  canvas.addEventListener("mouseup", (event) => {
    isPainting = false;
  });
  save.addEventListener("click", () => {
    // 이미지로 저장해주고 콜백함수가 필요하다. 캔버스의 이미지를 의미 = blob
    canvas.toBlob((blob) => {
      const a_down = document.createElement("a");
      a_down.href = URL.createObjectURL(blob);
      // 특정인지값을 넣어주면 주소로 만들어주는 메소드
      a_down.download = "my_drawing.png";
      a_down.click();
    });
  });
}
function main_Lec_03_2() {
  const Parent_Draw2 = document.querySelector(
    "#lecture_3 .sub.sub2:last-child"
  );
  const canvas = Parent_Draw2.querySelector("canvas");
  const imageFile = Parent_Draw2.querySelector("#image-file");
  const ctx = canvas.getContext("2d");
  const textInputs = Parent_Draw2.querySelectorAll(".text");
  const topTextInput = Parent_Draw2.querySelector("#top-text");
  const bottomTextInput = Parent_Draw2.querySelector("#bottom-text");

  let image;
  let width;
  let height;
  let top_text = "";
  let bottom_text = "";
  const showInputs = () => {
    textInputs.forEach((input) => {
      input.style.display = "flex";
    });
  };
  const uploadImage = () => {
    width = image.width;
    height = image.height;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 50, 50);
    // 그림 그릴 이미지를 넘겨준다.
    showInputs();
  };
  const createImage = (event) => {
    const imgURL = URL.createObjectURL(event.target.files[0]);
    // console.log(event.target.files[0]);
    image = document.createElement("img");
    image.src = imgURL;
    image.addEventListener("load", uploadImage);
  };
  const drawText = () => {
    const offsetY = height / 20;
    const fontSize = height / 10;

    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = fontSize / 5;
    ctx.lineJoin = "round";

    ctx.textBaseline = "top";
    ctx.strokeText(top_text, width / 2, offsetY);
    // 반드시 이거부터!!!해야 우리 의도되로 된다. 아니면 자동으로 그려주지 않는다.
    ctx.fillText(top_text, width / 2, offsetY);

    ctx.textBaseline = "bottom";
    ctx.strokeText(bottom_text, width / 2, height - offsetY);
    ctx.fillText(bottom_text, width / 2, height - offsetY);
  };
  const updateText_top = (event) => {
    top_text = event.target.value;
    drawText();
  };
  const updateText_bottom = (event) => {
    bottom_text = event.target.value;
    drawText();
  };
  imageFile.addEventListener("change", createImage);
  topTextInput.addEventListener("change", updateText_top);
  bottomTextInput.addEventListener("change", updateText_bottom);
}
main_Lec_03_1();
main_Lec_03_2();
