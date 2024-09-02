const submenu = (e) => {
  // const tab  = document.querySelector(".lecture");
  const Parent = document.querySelector(".sub-menu")
  const tabItem = Parent.querySelectorAll(" .subList");
  const tabContent = document.querySelectorAll(".sub");
tabItem[0].classList.add("active")
tabContent[0].classList.add("show");
 tabItem.forEach((subList) => {
    subList.addEventListener("click",(e)=>{
      tabItem.forEach((subList)=>{
        subList.classList.remove("active")
      })
      subList.classList.add("active")
        tabContent.forEach((sub) => {
          const listOrder = e.target.dataset.list;
            if( sub.dataset.order === listOrder){
              sub.classList.add("show");
            } else sub.classList.remove("show");
        })
    })
  })
}
submenu()
const Mainmenu_tab = () => {
  const target = document.querySelectorAll(".list");
    let target_id;
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
          // submenu()
        });
        popup(event);
      });
    });
    // lectures.forEach((lecture) => {
    //   submenu(lecture)
    // });   

}
Mainmenu_tab(); 

