import React from 'react';
import cn from 'classnames';
import styles from "./button.module.scss";

// use text disabled handler
const Button = ({use, text, disabled, handler}) => {
  return (
    // <button className={`${styles.btn} ${styles[`btn--${use}`]}`} onClick={handler} disabled={disabled}>
    //     {text}
    // </button>
    <button className={cn(styles.btn, styles[`btn--${use}`])} onClick={handler} disabled={disabled}>
        {text}
    </button>
  )
}
 
export default Button;


