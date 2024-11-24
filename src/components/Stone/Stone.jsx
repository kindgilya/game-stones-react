import React from 'react'
import cn from 'classnames';
import styles from './stone.module.scss'

const Stone = ({id, color, disabled, hide, img, handler}) => {
  // img -> t1.png
  const classes = {
    [styles.stone]: true,
    // ['stone--pair']: true,
    [styles['stone--hide']]: hide,
  }

  const clickHandler = () => {
    handler({id, color});
  }

  return (
    <button className={cn(classes)} disabled={disabled} onClick={clickHandler}>
      <img src={img} alt="" />
    </button>
  )
}

export default Stone;