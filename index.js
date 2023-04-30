const Canvas = document.getElementById("canvas");
const Context = Canvas.getContext("2d");
var gameLoop;
var selectedBlock;

var displayWidth = screen.width;

const rows = 20;
const cols = 10;
const cellSize = displayWidth / 45;
const cellMargin = 5;
var score = 0;

var board = [
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],

    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],

    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],

    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
    [0,0,0,0,0, 0,0,0,0,0],
] 

Canvas.height = rows * cellSize;
Canvas.width = cols * cellSize;

Context.fillStyle = "White";
Context.fillRect(0, 0, Canvas.width, Canvas.height);

selectedBlock = new blocks[Math.floor(Math.random() * blocks.length - 1) + 1];

const clearRow = (index) =>
{
    for ( var i=index; i>0; i-- )  
    {
        board[i] = board[i-1];
    }
}

const clearFullRows = () =>
{
    for ( var r=0; r<rows; r++ )
    {
        var full = true;
        for ( var c=0; c<cols; c++ )
        {
            if (board[r][c] == 0)
                full = false;
        }

        if ( full )
        {
            score++;
            document.getElementsByClassName("Score")[0].innerHTML = score;
            clearRow(r);
        }
    }
}

const checkIfGameLost = () =>
{
    for ( var c=0; c<board[1].length; c++ ) 
    {
        if ( board[1][c] != 0 )
            return true;
    }

    return false;
}

const drawTemp = () =>
{
    Context.fillStyle = "White";
    Context.fillRect(0, 0, Canvas.width, Canvas.height);

    for ( var r=0; r<board.length; r++ ) 
        for ( var c=0; c<board[r].length; c++ )
        {
            if ( board[r][c] != 0 )
            {
                Context.drawImage(document.getElementById(board[r][c]), c * cellSize, r * cellSize, cellSize, cellSize);
            }
        }

    if ( selectedBlock )
        drawBlock(selectedBlock);
}

const GameLoop = () =>
{
    gameLoop = setInterval(()=>
    {
        drawTemp();
        selectedBlock.Row ++;

        if ( checkForContact(selectedBlock) )
        {
            placeBlock(selectedBlock);
            selectedBlock = new blocks[Math.floor(Math.random() * blocks.length - 1) + 1];
        }

        clearFullRows();
        if ( checkIfGameLost() )    
        {
            alert("Lost");
            clearInterval(gameLoop);
        }

    }, 255)
}

const goLeft = () =>
{
    if ( canMoveLeft(selectedBlock) )
    selectedBlock.Col--;
}

const goRight = () =>
{
    if ( canMoveRight(selectedBlock) )
        selectedBlock.Col++;
}

const goDown = () =>
{
    selectedBlock.Row++;
}

const rotate = () =>
{
    selectedBlock.grid = rotateMatrixCW(selectedBlock.grid);
    blockFits(selectedBlock);
    if ( !blockFits(selectedBlock) )
        selectedBlock.grid = rotateMatrixCCW(selectedBlock.grid);
}

window.addEventListener("keydown", (e) =>
{
    if ( e.code == "KeyA" )
    {
        goLeft();
    }
    if ( e.code == "KeyD" )
    {
        goRight();
    }
    if ( e.code == "KeyS" )
    {
        goDown();
    }
    if ( e.code == "KeyR" )  
    {
        rotate();
    }

    if ( checkForContact(selectedBlock) )
    {
        placeBlock(selectedBlock);
        selectedBlock = new blocks[Math.floor(Math.random() * blocks.length - 1) + 1];
    }
    drawTemp();
})

window.addEventListener("load", () =>
{
    GameLoop();
})

window.addEventListener("click", e =>
{
    if ( e.target.matches("#left") )
        goLeft()
    if ( e.target.matches("#right") )
        goRight();
    if ( e.target.matches("#down") )  
        goDown();
    if ( e.target.matches("#rotate") ) 
        rotate();

    if ( checkForContact(selectedBlock) )
    {
        placeBlock(selectedBlock);
        selectedBlock = new blocks[Math.floor(Math.random() * blocks.length - 1) + 1];
    }
    drawTemp();
})