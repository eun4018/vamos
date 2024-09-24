const Mainmenu_tab = () => {
  const target = document.querySelectorAll(".list");
  const lectures = document.querySelectorAll(".lecture");
  const popup = (event) => {
    let target_id = event.target.hash;
    document.querySelector(target_id).style.display = "flex";
  };
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
};
Mainmenu_tab();
const submenu = (e) => {
  const Parent = document.querySelector(".sub-menu");
  const tabItem = Parent.querySelectorAll(".subList");
  const tabContent = document.querySelectorAll(".sub");
  tabItem[0].classList.add("active");
  tabContent[0].classList.add("in");
  tabItem.forEach((subList) => {
    subList.addEventListener("click", (e) => {
      tabItem.forEach((subList) => {
        subList.classList.remove("active");
      });
      subList.classList.add("active");
      tabContent.forEach((sub) => {
        const listOrder = e.target.dataset.list;
        if (sub.dataset.order === listOrder) {
          sub.classList.add("in");
        } else sub.classList.remove("in");
      });
    });
  });
};
submenu();
const sub_menu2 = (e) => {
  const Parent = document.querySelector(".sub-menu.sub2");
  const tabItem2 = Parent.querySelectorAll(".subList.sub2");
  const tabContent2 = document.querySelectorAll(".sub.sub2");
  tabContent2[0].classList.add("on");
  tabItem2.forEach((subList_sub2) => {
    subList_sub2.addEventListener("click", (e) => {
      tabItem2.forEach((subList_sub2) => {
        subList_sub2.classList.remove("active");
      });
      subList_sub2.classList.add("active");
      tabContent2.forEach((sub_sub2) => {
        const indexOrder = e.target.dataset.index;
        if (sub_sub2.dataset.id === indexOrder) {
          sub_sub2.classList.add("on");
        } else sub_sub2.classList.remove("on");
      });
    });
  });
};
sub_menu2();

history.pushState("", "", "/study_main.html");
