package com.nmiles.chess.engine;

public class King extends Piece {
	public King(Piece.Side s){
		super(s);
	}

	@Override
	public boolean isLegalDestination(Piece[][] board, int[] current, int[] dest, boolean kingCheck) {
		// TODO Auto-generated method stub
		return false;
	}
}
