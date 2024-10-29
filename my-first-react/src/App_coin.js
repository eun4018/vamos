import { useEffect, useState } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMymoney] = useState([]);
  //처음에는 undefinced 상태이기 때문에 꼭!! 빈 []을 넣어줘야 한다.
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  //[] 빈배열이면 한번만 실행된다.
  function onChange(e) {
    setMymoney(e.target.value);
  }
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <br />
      {loading ? null : (
        <input
          type="number"
          onChange={onChange}
          value={myMoney}
          placeholder="Please Write your USD"
        />
      )}
      {loading ? null : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name}({coin.symbol}) : ${myMoney / coin.quotes.USD.price}
              USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
//coin의 의미 : coins안에 array를 의미한다
export default App;
