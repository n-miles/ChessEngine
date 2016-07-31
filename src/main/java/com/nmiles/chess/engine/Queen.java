package com.nmiles.chess.engine;

public class Queen extends Piece {
	public Queen(Piece.Side s){
		super(s);
	}

	@Override
	public boolean isLegalDestination(Piece[][] board, int[] current, int[] dest, boolean kingCheck) {
		// TODO Auto-generated method stub
		return false;
	}
}
