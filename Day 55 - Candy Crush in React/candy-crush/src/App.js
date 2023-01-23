import ScoreBoard from './components/ScoreBoard';
import { useEffect, useState } from 'react';
import blueCandy from './images/blue-candy.png';
import greenCandy from './images/green-candy.png';
import orangeCandy from './images/orange-candy.png';
import purpleCandy from './images/purple-candy.png';
import redCandy from './images/red-candy.png';
import yellowCandy from './images/yellow-candy.png';
import blank from './images/blank.png';

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

function App() {
  const [currentColorArragement, setCurrentColorArragement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [moveDown, setMoveDown] = useState(true);
  function checkForColumnOfFour() {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArragement[i];
      const isBlank = currentColorArragement[i] === blank;
      if (
        columnOfFour.every(
          (square) => currentColorArragement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArragement[square] = blank)
        );
        return true;
      }
    }
  }

  function checkForColumnOfThree() {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArragement[i];
      const isBlank = currentColorArragement[i] === blank;
      if (
        columnOfThree.every(
          (square) => currentColorArragement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArragement[square] = blank)
        );
        return true;
      }
    }
  }
  function checkForRowOfThree() {
    for (let i = 0; i < 64; i % width === width - 3 ? (i += 3) : i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArragement[i];
      // const notValid = [
      //   6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      // ];
      // if (notValid.includes(i)) continue;
      const isBlank = currentColorArragement[i] === blank;
      if (
        rowOfThree.every(
          (square) => currentColorArragement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArragement[square] = blank)
        );
        return true;
      }
    }
  }

  function checkForRowOfFour() {
    for (let i = 0; i < 64; i % width === width - 4 ? (i += 4) : i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArragement[i];
      const isBlank = currentColorArragement[i] === blank;

      if (
        rowOfFour.every(
          (square) => currentColorArragement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentColorArragement[square] = blank));
        return true;
      }
    }
  }

  function moveIntoSquareBelow() {
    if (!moveDown) return;
    console.log('MoveDownaqui dentro', moveDown);
    for (let i = 0; i < 64 - width; i++) {
      const isFirstRow = i / width < 1;
      if (isFirstRow && currentColorArragement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArragement[i] = candyColors[randomNumber];
      }
      if (currentColorArragement[i + width] === blank) {
        currentColorArragement[i + width] = currentColorArragement[i];
        currentColorArragement[i] = blank;
      }
    }
  }

  function dragStart(e) {
    setSquareBeingDragged(e.target);
  }

  function dragDrop(e) {
    setSquareBeingReplaced(e.target);
  }

  function dragEnd(e) {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute('data-id')
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute('data-id')
    );

    setMoveDown(false);
    console.log('brincation', moveDown);
    currentColorArragement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute('src');
    currentColorArragement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute('src');
    console.log(squareBeingReplacedId, squareBeingDraggedId);

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    // console.log('ALO');
    console.log(validMoves, validMove, squareBeingReplacedId);
    // console.log(squareBeingDraggedId);
    // console.log(validMove);
    // console.log(isARowOfThree, isARowOfFour, isAColumnOfThree, isAColumnOfFour);
    console.log(
      squareBeingReplacedId &&
        validMove &&
        (isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour)
    );
    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      console.log('');
      currentColorArragement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute('src');
      currentColorArragement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute('src');
      setCurrentColorArragement([...currentColorArragement]);
    }
    setMoveDown(true);
  }

  function createBoard() {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArragement(randomColorArrangement);
  }

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForRowOfFour();
      checkForRowOfThree();
      checkForColumnOfFour();
      checkForColumnOfThree();
      moveIntoSquareBelow();
      setCurrentColorArragement([...currentColorArragement]);
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    currentColorArragement,
    moveIntoSquareBelow,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArragement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        ))}
      </div>
      <ScoreBoard score={scoreDisplay}></ScoreBoard>
    </div>
  );
}

export default App;
