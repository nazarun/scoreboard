import React, {useState} from "react";

const GAME_SIZE = 4;

const boardStyle: React.CSSProperties = {
  width: `${GAME_SIZE * 40}px`,
  height: `${GAME_SIZE * 40}px`,
  display: 'flex',
  flexWrap: 'wrap',
}

const taleStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '1px solid grey',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}

const NumbersGame = () => {
  const arr = Array.from({ length: GAME_SIZE * GAME_SIZE }, (_, i) => i);
  
  const [shuffledArr, setShuffledArr] = useState([...arr].sort((a,b) => Math.random() - 0.5));
  console.log('shuffledArr', shuffledArr);
  
  const onClick = (clickedIndex: number, num: number) => {
    let emptyIndex = shuffledArr.findIndex((i) => i === 0);
    
    const sameRow = Math.floor(emptyIndex / GAME_SIZE) === Math.floor(clickedIndex / GAME_SIZE);
    const isAllowedHorizontally = sameRow && Math.abs(emptyIndex - clickedIndex) === 1;
    const isAllowedVertically = Math.abs(emptyIndex - clickedIndex) === GAME_SIZE;
    
    if (isAllowedHorizontally || isAllowedVertically) {
      // valid move
      setShuffledArr(prevArr => {
        const newArr = [...prevArr];
        newArr[emptyIndex] = num;
        newArr[clickedIndex] = 0;
        return newArr;
      });
      
      if (shuffledArr[shuffledArr.length -1] === 0) {
        checkForWin(shuffledArr);
      }
    }
  }
  
  const checkForWin = (arr: number[]) => {
    if (arr.join('') === '123456780') {
      alert('Win!');
    }
  }
  
  const onShuffle = () => {
    setShuffledArr([...arr].sort((a,b) => Math.random() - 0.5));
  }
  
  return (
    <>
      <div style={boardStyle}>
        {shuffledArr.map((num, index) => {
          return(
            <div
              key={num}
              style={taleStyle}
              onClick={() => onClick(index, num)}
            >
              {num !== 0 ? num : null}
            </div>
          );
        })}
      </div>
      <button onClick={onShuffle}>Shuffle</button>
    </>
  )
}

export default NumbersGame;


//  2 3 5
//  1 0 7
//  8 6 4
//
//  [2, 3, 5, 1, 0, 7, 8, 6, 4]