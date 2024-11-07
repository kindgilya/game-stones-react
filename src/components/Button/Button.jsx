import React from 'react';
import styles from "./button.module.scss";

// use text disabled handler
const Button = ({use, text, disabled, handler}) => {
  return (
    <button className={`${styles.btn} ${styles[`btn--${use}`]}`} onClick={handler} disabled={disabled}>
        {text}
    </button>
  )
}

export default Button;


