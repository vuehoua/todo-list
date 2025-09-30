import styles from "./Input.module.css";

function Input({ value, onChange, placeholder, type = "text", ...props }) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
