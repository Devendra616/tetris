document.addEventListener('DOMContentLoaded',()=> {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn= document.querySelector('#start-button');
    const GRID_WIDTH = 10;
    let nextRandom = 0;
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
  let currentTetromino = theTetrominoes[0][0];


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
        //  Randomly select a tetromino and its rotation
        random = nextRandom;
        nextRandom = Math.floor(Math.random()*theTetrominoes.length);
        console.log('nextRandom',nextRandom)
        currentTetromino = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        
        draw();
        displayNextTetromino();
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

    // move the tetromino one place to left if available
    function moveLeft() {
        undraw();
        // check left boundry
        const isAtLeftEdge = currentTetromino.some(index => {
            return (currentPosition + index) % GRID_WIDTH === 0;
        });

        if(!isAtLeftEdge) {
            currentPosition -=1;
        }

        // if already some other tetromino colliding revert
        const isColliding = currentTetromino.some(index => {
            return squares[currentPosition + index].classList.contains('taken');
        })
        if(isColliding) {
            currentPosition +=1;
        }
        draw();
    }
    // move the tetromino one place to right if available
    function moveRight() {
        undraw();
        // check left boundry
        const isAtRightEdge = currentTetromino.some(index => {
            return (currentPosition + index) % GRID_WIDTH === (GRID_WIDTH-1);
        });

        if(!isAtRightEdge) {
            currentPosition +=1;
        }
        // if already some other tetromino colliding revert
        const isColliding = currentTetromino.some(index => {
            return squares[currentPosition + index].classList.contains('taken');
        });console.log(isColliding)
        if(isColliding) {
            currentPosition -=1;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRotation++;
        // when reached at end of rotations start from begining
        if(currentRotation === currentTetromino.length) {
            currentRotation = 0;
        }
        console.log(currentRotation)
        currentTetromino = theTetrominoes[random][currentRotation];
        draw();
    }

    // assing functions to keycodesconsole
    function control(e) {
        switch (e.keyCode) { 
            // left arrow or A move left
            case 65 : 
            case 37 : moveLeft();
                      break;
            // right arrow or D move right                      
            case 39:
            case 68: moveRight();
                    break;
             // Down arrow or X moves down                   
            case 88: 
            case 40: moveDown();
                    break;
            // Up arrow or W rotates 
            case 87:
            case 38: rotate();
                    break;
        }
    }
    // arrow keys are triggered by keydown/keyup not by keypress
    document.addEventListener('keydown',control);
   

    // show next Tetromino in mini grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const DISPLAY_WIDTH = 4;
    let displayIndex = 0;

    // Tetrominos without rotations so first indexes only
    const nextTetrominos = [
        [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1, 2], //lTetromino
        [0, DISPLAY_WIDTH, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1], //zTetromino
        [1, DISPLAY_WIDTH, DISPLAY_WIDTH + 1, DISPLAY_WIDTH + 2], //tTetromino
        [0, 1, DISPLAY_WIDTH, DISPLAY_WIDTH + 1], //oTetromino
        [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1, DISPLAY_WIDTH * 3 + 1], //iTetromino
    ];

    // display shape in mini-grid display
    function displayNextTetromino() {
        // remove any tetromino from display grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
        });
        nextTetrominos[nextRandom].forEach( index => {
            displaySquares[index + displayIndex].classList.add('tetromino')
        });
        console.log('nextr',nextRandom);
        console.log('displi',displayIndex);
        
    }
})