import { MV_API } from "../../js/envy.js";
const form = document.querySelector("form");

const removeAll = () => {
  const movies = document.querySelectorAll(".movie");
  movies.forEach((movie) => {
    movie.remove();
  });
};
const searchMovie = () => {
  event.preventDefault();
  const input = document.querySelector("input");
  const { value: keyword } = input;
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${MV_API}`;
  if (keyword) {
    removeAll();
    fetch(searchURL)
      .then((response) => response.json())
      .then(({ results }) =>
        results.forEach((movie) => {
          createBlock(movie);
        })
      );
  }
};
const movieDetail = (event) => {
  //id 값 사용해야 하므로 event 인자를 가지고 온다.
  const { id } = event.target.parentElement;
  const detailURL = `https://www.themoviedb.org/movie/${id}`;
  window.open(detailURL, "_blank");
};
const createBlock = ({
  id,
  poster_path,
  original_title,
  title,
  vote_average,
  release_date,
}) => {
  const parent = document.querySelector(".contents");
  const movie = document.createElement("div");
  const poster = document.createElement("img");
  const detail = document.createElement("div");
  const info = document.createElement("div");
  const date = document.createElement("div");
  const rate = document.createElement("div");
  const h3 = document.createElement("h3");

  movie.className = "movie";
  detail.className = "detail";
  info.className = "info";
  date.className = "date";
  rate.className = "rate";

  movie.id = id;
  poster.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
  h3.innerText = `${original_title} (${title})`;
  date.innerText = release_date;
  rate.innerText = `⭐${vote_average}`;

  poster.addEventListener("click", movieDetail);

  info.append(date, rate);
  detail.append(info, h3);
  movie.append(poster, detail);
  parent.append(movie);
  /*<div class="movie">
    <img src="" alt="" />
    <div class="detail">
      <div class="info">
        <div class="date">popularity</div>
        <div class="rate">vote_average</div>
      </div>
      <h3>original_title (title)</h3>
    </div>
  </div> */
};
const getPopularMovies = () => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${MV_API}&language=ko-KR&page=1`;
  fetch(URL)
    .then((response) => response.json())
    .then(({ results }) => {
      results.forEach((movie) => {
        createBlock(movie);
      });
    });
};
getPopularMovies();
form.addEventListener("submit", searchMovie);
