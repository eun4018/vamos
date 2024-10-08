//외부파일 import
// import data from "/data.json" assert ("json");
import data from "./data.js";
import { Api_Key } from "./envy.js";
// console.log(data.data)
function list_array() {
  const lecture4 = document.querySelector("#lecture_4");
  const button = lecture4.querySelector("button");
  //sort
  const asceButton = lecture4.querySelector(".ascending");
  const descButton = lecture4.querySelector(".descending");
  //select
  let myProducts;
  const select = lecture4.querySelector("select");
  const removeItem = () => {
    const items = lecture4.querySelectorAll("li");
    items.forEach((item) => {
      item.remove();
    });
  };
  //reduce
  let selected = [];
  const calculate = () => {
    const result = selected.reduce((acc, current) => {
      return acc + current.price;
    }, 0);
    // const reducer = (acc, current) => acc + current.price;
    // const result = selected.reduce(reducer, 0)
    // 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행
    updateTotal(result);
  };
  const addCart = (event) => {
    const { checked } = event.target; // 구조분해할당
    const { id } = event.target.parentElement.parentElement;
    if (checked) {
      //true
      myProducts.forEach((data) => {
        if (data.id == Number(id)) {
          //문자열 -> 정수 변환 parseInt
          //아니면 == 두개만 적어야한다. parseInt로 하니까 비교를 못함, 그래서 Number를 넣어줌
          selected.push(data);
        }
      });
    } else {
      selected = selected.filter((data) => {
        return data.id !== id;
      });
    }
    calculate();
  };
  const updateTotal = (price) => {
    const span = document.querySelector(".total-price");
    const formatted = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
    span.innerText = formatted;
  };
  const CreateItem = (data) => {
    const ul = lecture4.querySelector("ul");
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const div = document.createElement("div");
    //reduce 배열을 기반으로 하나의 값을 도출할 때 사용
    const label = document.createElement("label");
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.addEventListener("change", addCart);
    //Intl = international
    const price = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(data.price); // 인자로 가져올 데이터
    // const price = krw.format(data.price)
    li.id = data.id;
    h3.className = "name";
    h3.innerText = data.name;
    div.className = "price";
    div.innerText = price;

    //label
    label.append(check, h3, div);
    li.append(label);
    ul.append(li);
  };
  // sortAsce
  const sortAsce = () => {
    const myProducts = data.data.sort((a, b) => {
      return a.price - b.price;
    }); //유니코드는 정확한 비교불가
    // console.log(myProducts);
    removeItem();
    myProducts.forEach((data) => {
      CreateItem(data);
    });
  };
  const sortDesc = () => {
    const myProducts = data.data.sort((a, b) => {
      return b.price - a.price;
    });
    removeItem();
    myProducts.forEach((data) => {
      CreateItem(data);
    });
  };
  //select
  const selectCategory = (event) => {
    if (myProducts) {
      const { selectedIndex } = event.target.options; // 구조분해할당 ES6
      const { value } = event.target.options[selectedIndex];
      const filtered = myProducts.filter((data) => {
        return data.category == value;
      });
      removeItem();
      filtered.forEach((data) => {
        CreateItem(data);
      });
    }
  };
  const importData = () => {
    if (data) {
      // select.selectedIndex = 0;
      //셀렉트 초기화
      myProducts = data.data;
      myProducts.map((data) => {
        if (!document.getElementById(data.id)) {
          //존재하지 않을때만!
          CreateItem(data);
        }
      });
    }
  };
  button.addEventListener("click", importData);
  //sort button
  asceButton.addEventListener("click", sortAsce);
  descButton.addEventListener("click", sortDesc);

  select.addEventListener("change", selectCategory);
}
list_array();

const getCurrentWeather = (latitude, longitude) => {
  /* units=metric 표준 위치 단위 */
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Api_Key}&units=metric`;
  fetch(url)
    // fetch() 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고,
    // Promise 타입의 객체를 반환합니다.
    // 반환된 객체는, API 호출이 성공했을 경우에는 응답(response) 객체를 resolve하고,
    // 실패했을 경우에는 예외(error) 객체를 reject합니다.
    .then((response) => response.json()) //2
    .then((data) => {
      const city = document.querySelector(".city");
      const weather = document.querySelector(".weather");
      const temp = document.querySelector(".temp");
      const icon = document.querySelector(".icon");
      city.innerText = data.name;
      weather.innerText = data.weather[0].main; // 0번째 배열안에 main이 들어있음.
      temp.innerText = `${data.main.temp}°C`;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }); //3
};
const getPosition = (position) => {
  const { latitude, longitude } = position.coords;
  getCurrentWeather(latitude, longitude);
};
const errorHandler = (error) => {
  // console.log(error.message);
  const Weather_box = document.querySelector("#weather");
  const cont = Weather_box.querySelector(".container");
  const noti = document.querySelector(".noti");
  cont.style.display = "none";
  noti.style.display = "block";
};
const LoadWeather = () => {
  if ("geolocation" in navigator) {
    /* geolocation is available */
    //GeolocationPosition 지금 내가 있는 곳의 위치
    navigator.geolocation.getCurrentPosition(getPosition, errorHandler);
    /* 첫번째 인자 : 성공, 두번재 인자 : 실패 */
  } else {
    /* geolocation IS NOT available */
    errorHandler();
  }
};

LoadWeather();
