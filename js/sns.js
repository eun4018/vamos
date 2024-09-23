//https://jsonplaceholder.typicode.com/ -> 테스트 할 수 있는 모의 서버
//HTTP(HyperText Transfer Protocol) -> 서버와 응답을 주고 받기 위한 장치
//HTTP Method 어떤 동작을 요청할지 결정하는 도구 -> GET, POST , PUT,  PATCH(일부분), DELETE -> 요청하는 목적이 다름
const feed = document.querySelector(".feed");
const getUserById = (id) => {
  const URL = `https://jsonplaceholder.typicode.com/users/${id}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
};
const createPost = async (post) => {
  const wrap = document.createElement("div");
  const user = document.createElement("a");
  const article = document.createElement("div");

  wrap.className = "post";
  user.className = "user";
  article.className = "article";

  wrap.id = post.id;
  article.innerText = post.body;
  //비동기 처리 :시에 일어나지 않는다는 의미 (fetch메소드) VS 동기처리 :  데이터의 요청과 결과가 한 자리에서 동시에 일어나는것
  //promise 객체 . 비동기 작업이 끝날 때까지 결과를 기다리는 것이 아니라, 결과를 제공하겠다는 '약속'을 반환한다는 의미에서 Promise라 명명 지어짐
  //async 키워드는 어렵게 생각할 필요없이 await를 사용하기 위한 선언문  넣어주면 비동기 함수가 된다. ex. async function a(){}
  //await 키워드는 promise.then() 보다 좀 더 세련되게 비동기 처리의 결과값을 얻을 수 있도록 해주는 문법

  const userInfo = await getUserById(post.userId);
  user.innerText = `@${userInfo.username}`;
  // userInfo.username에서 userInfo가 변수에 도달하기도 전에 username을 불렀으나 기디라지 않고 user.href로 처리 해버렸으므로 에러발생
  user.href = "user.html"; //클릭했을때 user아이디값을 저장할 방법으로 로컬스토리지 활용
  user.addEventListener("click", () => {
    localStorage.setItem("userId", post.userId);
  });

  //base.com/123
  // '동적으로 할당한다'는 말 -> 앞쪽 베이스 URL은 'coding.com/user'와 같이 동일하게 만듦. 사용자가 누군지에 따라 뒷부분의 주소를 'coding.com/user/123'과 같이
  // 각각 다르게 할당한다는 의미
  wrap.append(user, article);
  feed.append(wrap);

  //     <div class="post">
  //           <a class="user" href="#">@user</a>
  //       <div class="article">
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quasi!
  //       </div>
  //   </div>
};
//정보를 받아오는 부분
const getAllPosts = () => {
  const URL = `https://jsonplaceholder.typicode.com/posts`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        createPost(post);
      });
    });
};
if (feed) {
  getAllPosts();
}
