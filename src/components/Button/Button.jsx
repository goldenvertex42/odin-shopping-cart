import styles from "./Button.module.css"

const Button = ({ children, onClick }) => {
  return (
    <button className={styles.button64} role="button" onClick={onClick}>
        <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;