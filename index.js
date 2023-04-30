const Canvas = document.getElementById("canvas");
const Context = Canvas.getContext("2d");
var gameLoop;
var selectedBlock;

const rows = 20;
const cols = 10;
const cellSize = 50;
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

window.addEventListener("keydown", (e) =>
{
    if ( e.code == "KeyA" )
    {
        if ( canMoveLeft(selectedBlock) )
            selectedBlock.Col--;
    }
    if ( e.code == "KeyD" )
    {
        if ( canMoveRight(selectedBlock) )
            selectedBlock.Col++;
    }
    if ( e.code == "KeyS" )
    {
        selectedBlock.Row++;
    }
    if ( e.code == "Space" )
    {
        console.log(selectedBlock.grid);
    }
    if ( e.code == "KeyR" )  
    {
        selectedBlock.grid = rotateMatrixCW(selectedBlock.grid);
        blockFits(selectedBlock);
        if ( !blockFits(selectedBlock) )
        selectedBlock.grid = rotateMatrixCCW(selectedBlock.grid);
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