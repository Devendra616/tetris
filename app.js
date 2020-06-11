document.addEventListener('DOMContentLoaded',()=> {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn= document.querySelector('#start-button');
    const GRID_WIDTH = 10;
     //The Tetrominoes
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]

    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ]

    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]

    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
    ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
  let currentPosition = 4;
  let currentRotation = 0;

//  Randomly select a tetromino and its rotation
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let currentTetromino = theTetrominoes[random][currentRotation];

    // draw the first rotation in tetromino
    function draw() {
        currentTetromino.forEach(index => {
            squares[currentPosition+ index].classList.add('tetromino');
        })
    }
    // undraw tetromino
    function undraw() {
        currentTetromino.forEach(index => {
            squares[currentPosition+ index].classList.remove('tetromino');
        })
    }

    // make the tetromino move down every second
    timerId = setInterval(moveDown,1000);
   
    function moveDown() {
        undraw();
        currentPosition += GRID_WIDTH;
        draw();
        freeze();
    }
    
    // Start a new tetromino falling
    function startNewTetromino() {
        let random = Math.floor((Math.random() * theTetrominoes.length));
        currentTetromino = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        
    }

    function isNextDownPositionIsTaken(curIndex) {      
        let position =  squares[currentPosition + curIndex + GRID_WIDTH];     
        return position.classList.contains('taken');
    }
    
    // freeze tetromino at a place when no place to move
    function freeze() {
       
        if(currentTetromino.some(isNextDownPositionIsTaken)) {
            // make all positions of current Tetrromino as taken
            currentTetromino.forEach( index => {
                squares[currentPosition+ index].classList.add('taken');
            });
            startNewTetromino();
        }
    }

    

   
})