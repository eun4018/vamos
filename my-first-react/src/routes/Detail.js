import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const { id } = useParams(); //구조분해 할당
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    //async는 함수의 앞에 붙여서 해당 함수가 비동기 함수임을 나타내며, await는 비동기 함수의 실행 결과를 기다리는 키워드
    console.log(json);
    setLoading((current) => !current);
    setGenres(json.data.movie.genres);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div key={movie.id}>
      {loading ? (
        <h1>Loading...?</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <p>
            {movie.year} / {movie.runtime}분 / {movie.rating}점
          </p>
          <img src={movie.small_cover_image} />
          <img src={movie.background_image} />
          <p>{movie.description_intro}</p>
          <ul>
            {genres.map((genres) => (
              <li>{genres}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
