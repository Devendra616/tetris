document.addEventListener('DOMContentLoaded',()=> {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const gameOverText =  document.querySelector('.game-over');
    const startBtn= document.querySelector('button');
    const bgVideo = document.querySelector('#videoBG');
    const GRID_WIDTH = 10;
    const GRID_ROWS = 200;
    let nextRandom = 0;
    let random = 0;
    let timerId;
    let score = 0;
    const colors = ['#FF0D72',
                    '#0DC2FF',
                    '#0DFF72',
                    '#F538FF',
                    '#FF8E0D',
                    '#FFE138',
                    '#3877FF',
                ];
     //The Tetrominoes
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]

    const sTetromino = [
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

    const zTetromino = [
        [0,1,GRID_WIDTH+1 , GRID_WIDTH + 2], //[1,10,11,21]=>[(0,1),(1,0),(1,1),(2,1)]
        [1, GRID_WIDTH+1, GRID_WIDTH , GRID_WIDTH *2],
        [0,1,GRID_WIDTH+1 , GRID_WIDTH + 2],
        [1, GRID_WIDTH+1, GRID_WIDTH , GRID_WIDTH *2],
    ]

  const theTetrominoes = [lTetromino, sTetromino, tTetromino, oTetromino, iTetromino,zTetromino];
  let currentPosition = 4;
  let currentRotation = 0;
  let currentTetromino = theTetrominoes[0][0];

 
    // draw the first rotation in tetromino
    function draw() {
        currentTetromino.forEach(index => {
            squares[currentPosition+ index].classList.add('tetromino');
            squares[currentPosition+ index].style.backgroundColor = colors[random];            
        })
    }
    // undraw tetromino
    function undraw() {
        currentTetromino.forEach(index => {
            squares[currentPosition+ index].classList.remove('tetromino');
            squares[currentPosition+ index].style.backgroundColor = '';
        })
    }

    // make the tetromino move down every second
    //timerId = setInterval(moveDown,1000);
   
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
            addScore();
            gameOver();
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
        });
        if(isColliding) {
            currentPosition -=1;
        }
        draw();
    }

    function rotate() {
        let tempTetromino;
                          
        currentRotation++;
        // when reached at end of rotations start from begining
        if(currentRotation === currentTetromino.length) {
            currentRotation = 0;
        }      
        tempTetromino = theTetrominoes[random][currentRotation];   
        //  check if on rotation, it collides with freezed ones
        const isColliding = tempTetromino.some(index => squares[currentPosition+index].classList.contains('taken'));
        // * Checks if at either edge
        const isAtLeftEdge = tempTetromino.some(index => (currentPosition + index) % GRID_WIDTH === 0);
        const isAtRightEdge = tempTetromino.some(index => (currentPosition + index) % GRID_WIDTH === (GRID_WIDTH - 1));
        // after rotation some portions should not be at both ends
        if(!isColliding&& !(isAtLeftEdge&&isAtRightEdge)) {
            // do the changes
            undraw();
            currentTetromino = tempTetromino;
            draw();
       }
        
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
         [0, DISPLAY_WIDTH, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1], //sTetromino
         [1, DISPLAY_WIDTH, DISPLAY_WIDTH + 1, DISPLAY_WIDTH + 2], //tTetromino
         [0, 1, DISPLAY_WIDTH, DISPLAY_WIDTH + 1], //oTetromino
         [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1, DISPLAY_WIDTH * 3 + 1], //iTetromino
         [0, 1,DISPLAY_WIDTH+1, DISPLAY_WIDTH+2], //zTetrnomino
    ];

    // display shape in mini-grid display
    function displayNextTetromino() {
        // remove any tetromino from display grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
        });
        nextTetrominos[nextRandom].forEach( index => {
            displaySquares[index + displayIndex].classList.add('tetromino');
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
        });
           
    }

    // start/pause button
    
    startBtn.addEventListener('click', ()=> {
        // change button text
        if (startBtn.getAttribute("data-text-swap") == startBtn.innerHTML) {
            startBtn.innerHTML = startBtn.getAttribute("data-text-original");
            startBtn.classList.remove('fa-pause');
            startBtn.classList.add('fa-play');
            
          } else {
            //startBtn.setAttribute("data-text-original", startBtn.innerHTML);
            startBtn.innerHTML = startBtn.getAttribute("data-text-swap");
            startBtn.classList.add('fa-pause');
            startBtn.classList.remove('fa-play');            
          }
        // if already running, pause moving down
        if(timerId) {
            clearInterval(timerId);
            timerId = null;
            bgVideo.pause();
            $(startBtn).text = 'Start';
            bgVideo.muted = true;
        } else {
            //start moving down
            bgVideo.play();
            bgVideo.muted = false;
            draw();
            timerId = setInterval(moveDown, 1000);
            //nextRandom = Math.floor(Math.random()* theTetrominoes.length);
            displayNextTetromino();
        }
    });

    // add score
    function addScore(){
        // loop for each row start index
        for(let i =0;i<GRID_ROWS-1; i+=GRID_WIDTH) {
            // all the columns of a row
            const row=[i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];
            
            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor='';
                });
                const squaresRemoved = squares.splice(i,GRID_WIDTH);               
                // add the removed squares to top              
                 squares = squaresRemoved.concat(squares);
                 squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    function gameOver() {
        const isColliding = currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'));
        if(isColliding) {
            scoreDisplay.innerHTML = score;
            gameOverText.style.display = 'block';
            clearInterval(timerId);
            timerId = null;
            bgVideo.pause();
            // hide the play button 
            startBtn.style.visibility = 'hidden';

        }
    }
}) ;


/* 
    * INDEX explained:
    width = 10
    [1, width+1, width*2+1, 2]

    after factoring in width:
    =[01, 11, 21, 02]

    taking those numbers as x and y values:
    =[(0, 1), (1, 1), (2, 1), (0, 2)]

    the x and y values indicate which box to colour.

    [0,0]  [0,1]  [0,2]
    [1,0]  [1,1]  [1,2]
    [2,0]  [2,1]  [2,2]



*/