import Button from "./Button"
import styles from "./App.module.css"
function App() {
  const [counter,setValue] = useState(); 
  // react. 이라고 적지 않는다.
  return (
    <div>
      <h1 className={styles.title}>Welcome back!</h1>
      <Button text={"Continue"}/>
    </div>
  );
}

export default App;
