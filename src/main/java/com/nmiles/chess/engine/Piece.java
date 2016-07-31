package com.nmiles.chess.engine;

public abstract class Piece {
	public enum Side {
		BLACK, WHITE
	}

	private static final int X_INDEX = 0;
	
	private static final int Y_INDEX = 1;
	
	private static final int BOARD_WIDTH = 8;
	
	Side side;
	
	public Piece (Side s){
		side = s;
	}
	
	public abstract boolean isLegalDestination(Piece[][] board, int[] current, int[] dest, boolean kingCheck);
	
	public boolean putsKingInCheck(Piece[][] board, int[] current, int[] dest){
		Piece[][] newState = getNewState(board, current, dest);
		int[] kingCoords = findKing(board);
		Side enemyColor;
		if (this.side == Side.BLACK){
			enemyColor = Side.WHITE;
		} else {
			enemyColor = Side.BLACK;
		}
		
		for (int i = 0; i < BOARD_WIDTH; i++){
			for (int j = 0; j < BOARD_WIDTH; j++){
				// if there is a piece at this place and it's an enemy piece
				if (board[i][j] != null && board[i][j].side == enemyColor){
					// TODO more stuff, ignore this for now
				}
			}
		}
		
		return false;
	}
	
	private int[] findKing(Piece[][] board){
		int[] kingCoords = {-1, -1};
		for (int i = 0; i < BOARD_WIDTH; i++){
			for (int j = 0; j < BOARD_WIDTH; j++){
				if (board[i][j].side == this.side && board[i][j] instanceof King){
					kingCoords[X_INDEX] = i;
					kingCoords[Y_INDEX] = j;
					return kingCoords;
				}
			}
		}
		throw new IllegalArgumentException("Malformed Board: no king present for this color.");
	}
	
	private Piece[][] getNewState(Piece[][] board, int[] current, int[] dest){
		Piece[][] ret = new Piece[BOARD_WIDTH][BOARD_WIDTH];
		for (int i = 0; i < BOARD_WIDTH; i++){
			for (int j = 0; j < BOARD_WIDTH; j++){
				ret[i][j] = board[i][j];
			}
		}
		ret[dest[X_INDEX]][dest[Y_INDEX]] = ret[current[X_INDEX]][current[Y_INDEX]];
		ret[current[X_INDEX]][current[Y_INDEX]] = null;
		return ret;
	}
}
