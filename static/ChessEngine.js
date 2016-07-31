var boardWidth   = 8;
var boardHeight  = 8;
var board        = null;



function Piece(img)
{
    this.img   = img;
}

function Board()
{
    this.grid      = new Array(boardWidth * boardHeight);
    this.getPiece  = function(x, y)
                     {
                        return this.grid[y*boardWidth + x];
                     }
    this.setPiece  = function(x, y, piece)
                     {
                        this.grid[y*boardWidth +x] = piece;
                     }

    // time to populate the board with its default piece placement
    //
    // Black
    this.setPiece(0,0, new Piece("pieces/alpha/br.svg")); 
    this.setPiece(1,0, new Piece("pieces/alpha/bn.svg")); 
    this.setPiece(2,0, new Piece("pieces/alpha/bb.svg")); 
    this.setPiece(3,0, new Piece("pieces/alpha/bq.svg")); 
    this.setPiece(4,0, new Piece("pieces/alpha/bk.svg")); 
    this.setPiece(5,0, new Piece("pieces/alpha/bb.svg")); 
    this.setPiece(6,0, new Piece("pieces/alpha/bn.svg")); 
    this.setPiece(7,0, new Piece("pieces/alpha/br.svg")); 
    this.setPiece(0,1, new Piece("pieces/alpha/bp.svg")); 
    this.setPiece(1,1, new Piece("pieces/alpha/bp.svg")); 
    this.setPiece(2,1, new Piece("pieces/alpha/bp.svg")); 
    this.setPiece(3,1, new Piece("pieces/alpha/bp.svg")); 
    this.setPiece(4,1, new Piece("pieces/alpha/bp.svg")); 
    this.setPiece(5,1, new Piece("pieces/alpha/bp.svg")); 
    this.setPiece(6,1, new Piece("pieces/alpha/bp.svg")); 
    this.setPiece(7,1, new Piece("pieces/alpha/bp.svg")); 
    //
    // White
    this.setPiece(0,7, new Piece("pieces/alpha/wr.svg"));
    this.setPiece(1,7, new Piece("pieces/alpha/wn.svg"));
    this.setPiece(2,7, new Piece("pieces/alpha/wb.svg"));
    this.setPiece(3,7, new Piece("pieces/alpha/wq.svg"));
    this.setPiece(4,7, new Piece("pieces/alpha/wk.svg"));
    this.setPiece(5,7, new Piece("pieces/alpha/wb.svg"));
    this.setPiece(6,7, new Piece("pieces/alpha/wn.svg"));
    this.setPiece(7,7, new Piece("pieces/alpha/wr.svg"));
    this.setPiece(0,6, new Piece("pieces/alpha/wp.svg"));
    this.setPiece(1,6, new Piece("pieces/alpha/wp.svg"));
    this.setPiece(2,6, new Piece("pieces/alpha/wp.svg"));
    this.setPiece(3,6, new Piece("pieces/alpha/wp.svg"));
    this.setPiece(4,6, new Piece("pieces/alpha/wp.svg"));
    this.setPiece(5,6, new Piece("pieces/alpha/wp.svg"));
    this.setPiece(6,6, new Piece("pieces/alpha/wp.svg"));
    this.setPiece(7,6, new Piece("pieces/alpha/wp.svg"));
}

function toggleClass(name)
{
    if(name == "white_sqare")
    {
        name = "black_sqare";
    }
    else
    {
        name= "white_sqare";
    }
    return name;
}

function drawBoard(board)
{
    sclass = "white_square";
    var newstr = "";
    for(i=0; i<boardHeight; ++i)
    {
        toggleClass(sclass);
        newstr += "<tr>";

        for(j=0; j<boardWidth; ++j)
        {
            newstr += "<td class='" + toggleClass(sclass) + "'>";
            if(board.getPiece(j,i) != null)
            {
                newstr += "<img src='" + board.getPiece(j,i).img + "'/>";
            } 
            newstr += "</td>";

        }
        newstr += "</tr>";
    }
    $("#chessboard_tbody").empty();
    $("#chessboard_tbody").append(newstr);

}


$(document).ready(function() 
{
    board = new Board(); 
    drawBoard(board);
});




