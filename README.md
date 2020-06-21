# Universe Tetris
Tetis game that can be played on desktop/laptop browser.

## Live Demo
- [Github page](https://devendra616.github.io/tetris-universe/)
- [GoFastIO](https://universe-tetris.imfast.io/) 

## Background
Tetris is a video game created by Russian designer Alexey Pajitnov in 1985 that allows players to rotate falling blocks strategically to clear levels. Pajitnov claimed he created the name of the game by combining the Greek prefix tetra, which refers to the four squares contained in each block, with the word tennis. 

## Game Info
In _Tetris_, players must complete lines by moving differently shaped pieces (tetrominoes), which descend onto the playing field. The completed lines disappear and grant the player points, and the player can proceed to fill the vacated spaces. The game ends when the playing field is filled. The longer the player can delay this inevitable outcome, the higher their score will be.
The objective of the game is to use the pieces to create as many horizontal lines of blocks as possible. When a line is completed, it disappears, and the blocks placed above fall one rank.

## Technologies Used
Here I have created TETRIS game using JavaScript and HTML (HTML5). 

 - HTML5
 - Vanilla Javascript without framework
 - Fontawesome
 - Bootstrap
 - Google Fonts
 - Git
 
## Snapshots

### Preview
![Preview](https://res.cloudinary.com/nmdc/video/upload/v1592723613/codepen/snapshot-gif.gif)

### Game Playing Screen
![Game Play](https://res.cloudinary.com/nmdc/image/upload/v1592723611/codepen/GamePlay_Screen.jpg)

### Game Ends
![Game Ends Screen](https://res.cloudinary.com/nmdc/image/upload/v1592723611/codepen/WhatsApp_Image_2020-06-19_at_1.50.33_AM.jpg)


## Some Code
 INDEX explained:
    width = 10    
    [1, width+1, width*2+1, 2] 
    after factoring in width:    
    =[01, 11, 21, 02]    
    taking those numbers as x and y values:    
    =[(0, 1), (1, 1), (2, 1), (0, 2)] 
     the x and y values indicate which box to colour.
       
    [0,0] [0,1] [0,2]    
    [1,0] [1,1] [1,2]    
    [2,0] [2,1] [2,2]

# Scopes Of Improvement
 - Add levels on score reaching a certain limit.
 - Show no of lines cleared.
 - Multiplayer game.
 - Mobile responsive and buttons for mobile player.
 - Some other tetrominoes can be added to increase difficulty.
 - Speed increase on increase in level. Display current speed on sidebar.