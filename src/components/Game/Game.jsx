import React from 'react';
import cn from 'classnames';
import styles from './game.module.scss';
import data from '../../data.js';
import Stone from '../Stone/Stone';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';

const Game = () => {
  const [startGame, setStateStartGame] = useState(false);
  
  const [stonesStatus, setStateStoneStatus] = useState(data.map((el) => {
    return {
      ...el,
      disabled:true,
      hide:false
    }
  }));

  const [pair, setStatePair] = useState([]);
  const [foundParts, setStateFoundParts] = useState(0);
  
  // async hook
  useEffect(() => {
    if (startGame) {
      setStateStoneStatus(stonesStatus.map((elem) => {
        return {
          ...elem,
         disabled: false,
         hide: true,
        } 
       }).sort((a, b) => 0.5 - Math.random()));
    }
  
    if (!startGame) {
      setStateStoneStatus(stonesStatus.map((elem) => {
            return {
              ...elem,
             disabled: true,
             hide: false,
            } 
           }));
          //  this._setStateFoundParts(0);
        }
  }, [startGame])

  useEffect(() => {
    if (isEqualPair()) {
      const idsStonesInPair = [pair[0].id, pair[1].id];

      const newStateStonesArray = stonesStatus.map((el) => {
        if (idsStonesInPair.includes(el.id)) {
          el.disabled = true;
          el.hide = false;
          return el;
        }
        return el;
      })

      setStateStoneStatus(newStateStonesArray);
      setStateFoundParts(foundParts + 1);

    }
  }, [pair])

  useEffect(() => {
    if (getTotalParts() === foundParts) {
      setStateStartGame(false);
      setStateFoundParts(0);
    }
  }, [foundParts])
  
  

  const setStatePairHandler = (obj) => {
    // fix dblclick
    if (pair.length === 1 && pair[0].id === obj.id) {
      return;
    }
    
    if (pair.length === 2) {
        setStatePair([obj]);  
    } else {
      setStatePair([...pair, obj]);   
    }
  }

  const isEqualPair = () => {
    if (pair.length < 2) {
      return false;
    }
    if (pair[0].color === pair[1].color) {
      return true;
    }
    return false;
  }

  const getTotalParts = () => {
    const obj = stonesStatus.reduce((acc, el) => {
      if (acc[el.color] === undefined) {
        acc[el.color] = 1;
      } else {
        acc[el.color] += 1;
      }
      return acc;
    }, {});
    
    return Object.values(obj).reduce((acc, el) => {
      acc += Math.floor(el / 2);
      return acc
    }, 0);
  }
  
  return (
    <div className={cn(styles.game)}>
				<div className={cn(styles.game__btn)}>
          <Button use="start" text={startGame ? "finish game" : "start game"} handler={() => setStateStartGame(!startGame)} />
        </div>
        <span className={cn(styles.game__found)}>Found parts: {foundParts}</span>
        <span className={cn(styles.game__total)}>Total parts: {getTotalParts()}</span>
        <div className={cn(styles.game__field)}>
          {stonesStatus.map((obj) => {
            return <Stone key={obj.id} id={obj.id} color={obj.color} disabled={obj.disabled} img={obj.img} hide={obj.hide} handler={setStatePairHandler}/>
          })}
        </div>
        </div>
  )
}
export default Game;