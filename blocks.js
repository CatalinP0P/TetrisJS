const blocks = [IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock];

const drawBlock = (b) =>
{
    Context.fillStyle = b.Color;
    for ( var r=0; r<b.grid.length; r++ )
            for ( var c=0; c<b.grid[r].length; c++ )
            {
                if ( b.grid[r][c] != 0 )
                {
                    Context.drawImage(document.getElementById(b.Color), (b.Col + c) * cellSize, (b.Row + r) * cellSize, cellSize, cellSize);
                }
            }
}

const rotateMatrixCW = (matrix) =>
{
    var response = [];
    for ( var i=0; i<matrix.length; i++ )
    {
        response[i] = []
        for ( var j=0; j<matrix[i].length; j++ )
            response[i][j] = 0;
    }
    
    for ( var r=0; r<response.length; r++ )
    {
        for ( var c=0; c<response[r].length; c++ )
        {
            response[c][response.length - 1 - r] = matrix[r][c];
        }
    }

    return response;
}

const rotateMatrixCCW = (matrix) =>
{
    var response = [];
    for ( var i=0; i<matrix.length; i++ )
    {
        response[i] = []
        for ( var j=0; j<matrix[i].length; j++ )
            response[i][j] = 0;
    }
    
    for ( var r=0; r<response.length; r++ )
    {
        for ( var c=0; c<response[r].length; c++ )
        {
            response[response.length - 1 - c][r] = matrix[r][c];
        }
    }

    return response;
}

const blockFits = (block) =>
{
    for ( var r=0; r<block.grid.length; r++ )
    {
        for ( var c=0; c<block.grid[r].length; c++ )
        {
            if ( block.Col + c < 0 || block.Col + c >= rows)
                return false;

            if ( board[block.Row + r][block.Col + c] != 0 && block.grid[r][c] != 0 )
                return false;
        }
    }

    return true;
}

const canMoveRight = (block) =>
{
    for ( var r=0; r<block.grid.length; r++ )
        for ( var c=0; c<block.grid[r].length; c++ )
        {
            if ( block.grid[r][c] != 0 && block.Col + c >= cols - 1 )
            {
                return false;
            }
        }

    return true;
}

const canMoveLeft = (block) =>
{
    for ( var r=0; r<block.grid.length; r++ )
        for ( var c=0; c<block.grid[r].length; c++ )
        {
            if ( block.grid[r][c] != 0 && block.Col + c <= 0 )
                return false;
        }

    return true;
}

const placeBlock = (block) =>
{
    for ( var r=0; r<block.grid.length; r++ )
    {
        for ( var c=0; c<block.grid[r].length; c++ )
        {
            if ( block.grid[r][c] != 0 )
            {
                board[block.Row + r][block.Col + c] = block.grid[r][c];
            }
        }
    }
}

const checkForContact = (block) =>
{
    for ( var r=0; r<block.grid.length; r++ )
    {
        for ( var c=0; c<block.grid[r].length; c++ )  
        {
            if ( block.grid[r][c] != 0 && block.Row + r == rows-1 ) 
                return true;

            if ( block.grid[r][c] != 0 && board[block.Row + r + 1][block.Col + c] != 0 && board[block.Row + r + 1][block.Col + c] != null) 
                return true;
        }
    }

    return false;
}

function IBlock()
{
    this.Row = -4;
    this.Col = 0;
    this.Color = "1";
    
    this.grid = [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ]
}

function JBlock()
{
    this.Row = -3;
    this.Col  = 0;
    this.Color = "2"

    this.grid = [
        [0,2,0],
        [0,2,0],
        [2,2,0]
    ]
}

function LBlock()
{
    this.Row = -3;
    this.Col  = 0;
    this.Color = "3"

    this.grid = [
        [0,3,0],
        [0,3,0],
        [0,3,3]
    ]
}

function OBlock()
{
    this.Row = -2;
    this.Col  = 0;
    this.Color = "4"

    this.grid = [
        [4,4],
        [4,4]
    ]
}

function SBlock()
{
    this.Row = -3;
    this.Col  = 0;
    this.Color = "5"

    this.grid = [
        [5,0,0],
        [5,5,0],
        [0,5,0]
    ]
}

function TBlock()
{
    this.Row = -3;
    this.Col  = 0;
    this.Color = "6"

    this.grid = [
        [0,0,0],
        [0,6,0],
        [6,6,6]
    ]
}

function ZBlock()
{
    this.Row = -3;
    this.Col  = 0;
    this.Color = "7"

    this.grid = [
        [7,7,0],
        [0,7,7],
        [0,0,0]
    ]
}

// const getColor = (index) =>
// {
//     switch(index)
//     {
//         case 1: return "aqua";
//         case 2: return "blue";
//         case 3: return "orange";
//         case 4: return "yellow";
//         case 5: return "Green";
//         case 6: return "purple";
//         case 7: return "Red";
//     }
// }