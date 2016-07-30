package com.nmiles.chess.server;

import java.util.concurrent.ConcurrentLinkedQueue;

import org.glassfish.grizzly.websockets.DataFrame;
import org.glassfish.grizzly.websockets.WebSocket;
import org.glassfish.grizzly.websockets.WebSocketApplication;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 * The WebSocket endpoint for the server. This class manages everything about
 * the WebSocket's lifetime.
 * 
 * @author Nathan Miles
 *
 */
public class ChessApplication extends WebSocketApplication {
	/** A blank byte array for sending pings. */
	private static final byte[] PING_DATA = {};

	/**
	 * Called when a connected WebSocket sends a message.
	 */
	@Override
	public void onMessage(WebSocket websocket, String data) {
		websocket.send("It's working");
	}

	/**
	 * Called when a WebSocket disconnects or is disconnected from the server.
	 */
	@Override
	public void onClose(WebSocket socket, DataFrame frame) {
		// TODO stuff
	}
}
