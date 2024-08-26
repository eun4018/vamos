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