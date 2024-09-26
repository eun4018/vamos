import PropTypes from "prop-types";
import styles from "./Button.module.css";
function Button({text}){
    return <button className={styles.btn}>{text}</button> 
    //styles라는 컴포넌트에서 btn이라는 객체를 불러오는 것 
    //create-react-app.js는 무작위 적인 클래스를 갖는다. 
}
Button.propTypes = {
    text: PropTypes.string.isRequired,
}
export default Button;

