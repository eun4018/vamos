import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//hashrouter /뒤에 #이 붙는다.
import Detail from "./routes/Detail";
import Home from "./routes/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
//<Route path="/hello" element={<h1>hello</h1>} />
//:id react한테 /movie/여기 오는 id값이 뭔지 알고 싶다고 말하고 있는 것
//Switch Route를 찾고 Component을 Rendering 해준다.
export default App;
