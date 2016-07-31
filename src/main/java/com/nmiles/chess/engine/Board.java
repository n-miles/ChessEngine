package com.nmiles.chess.engine;

public class Board {
	
	private static final int X_INDEX = 0;
	
	private static final int Y_INDEX = 1;
	
	private static final int BOARD_WIDTH = 8;
	
	private Piece[][] board;
	
	public Board(){
		Piece.Side b = Piece.Side.BLACK;
		Piece.Side w = Piece.Side.WHITE;
		Piece[][] initial = {{new Rook(b), new Knight(b), new Bishop(b), new Queen(b), new King(b), new Bishop(b), new Knight(b), new Rook(b)},
							{new Pawn(b), new Pawn(b), new Pawn(b), new Pawn(b), new Pawn(b), new Pawn(b), new Pawn(b), new Pawn(b)},
							{null,        null,        null,        null,        null,        null,        null,        null},
							{null,        null,        null,        null,        null,        null,        null,        null},
							{null,        null,        null,        null,        null,        null,        null,        null},
							{null,        null,        null,        null,        null,        null,        null,        null},
							{new Pawn(w), new Pawn(w), new Pawn(w), new Pawn(w), new Pawn(w), new Pawn(w), new Pawn(w), new Pawn(w)},
							{new Rook(w), new Knight(w), new Bishop(w), new Queen(w), new King(w), new Bishop(w), new Knight(w), new Rook(w)}};
		board = initial;
	}
	
	/**
	 * Makes the given move.
	 * @return True if the move was made successfully, false if the move was illegal.
	 */
	public boolean makeMove(int[] current, int[] destination){
		if (current[X_INDEX] < 0 || current[Y_INDEX] < 0 ||
			current[X_INDEX] >= BOARD_WIDTH || current[Y_INDEX] >= BOARD_WIDTH ||
			destination[X_INDEX] < 0 || destination[Y_INDEX] < 0 ||
			destination[X_INDEX] >= BOARD_WIDTH || destination[Y_INDEX] >= BOARD_WIDTH){
			return false;
		}
		Piece toMove = board[current[X_INDEX]][current[Y_INDEX]];
		if (toMove == null){
			return false;
		}
		if (!toMove.isLegalDestination(board, current, destination, true)){
			return false;
		}
		board[destination[X_INDEX]][destination[Y_INDEX]] = toMove;
		board[current[X_INDEX]][current[Y_INDEX]] = null;
		return true;
	}
}
