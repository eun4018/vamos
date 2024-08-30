const target = document.querySelectorAll(".list");
const sub_target = document.querySelectorAll(".subList");
let target_id;
const lectures = document.querySelectorAll(".lecture");
const lec2 = document.querySelectorAll(".sub");
const popup = (event) => {
  let target_id = event.target.hash;
  document.querySelector(target_id).style.display = "flex";
};
const submenu = () => {
  sub_target.forEach((subList) => {
    lec2[0].style.display = "flex";
    sub_target[0].classList.add("on");
    subList.addEventListener("click", (event) => {
      sub_target.forEach((subList) => {
        subList.classList.remove("on");
      });
      subList.classList.add("on");
      lec2.forEach((sub) => {
        sub.style.display = "none";
      });
      popup(event);
    });
  });
};
submenu();
target.forEach((list) => {
  lectures[0].style.display = "flex";
  target[0].classList.add("on");
  list.addEventListener("click", (event) => {
    target.forEach((list) => {
      list.classList.remove("on");
    });
    list.classList.add("on");
    lectures.forEach((lecture) => {
      lecture.style.display = "none";
    });
    popup(event);
  });
});
