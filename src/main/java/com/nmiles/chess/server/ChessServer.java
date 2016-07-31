package com.nmiles.chess.server;

import java.util.concurrent.TimeUnit;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.websockets.WebSocketAddOn;
import org.glassfish.grizzly.websockets.WebSocketApplication;
import org.glassfish.grizzly.websockets.WebSocketEngine;

/**
 * This is a server for the RainbowGen program. It starts a Grizzly server,
 * registers a listener for WebSocket connections, and then waits. NOTE: you
 * MUST have an environment variable named "PORT" set on your system for this
 * program to work without modification. This variable should be set to whatever
 * port you want to access the homepage on. After you start the server, the
 * homepage will be available at http://localhost:[your port].
 * 
 * @author Nathan Miles
 *
 */
public class ChessServer {

	/**
	 * Starts the server and starts listening for connections.
	 * @param args Command line arguments. None are used.
	 */
	public static void main(String[] args) {
		int port = Integer.parseInt(System.getenv("PORT"));
		HttpServer server = HttpServer.createSimpleServer("static/", "0.0.0.0",
				port);
		server.getListener("grizzly").registerAddOn(new WebSocketAddOn());

		final WebSocketApplication chessGame = new ChessApplication();
		WebSocketEngine.getEngine().register("", "/chesssocket", chessGame);

		try {
			server.start();
			while (true) {
				TimeUnit.SECONDS.sleep(10);
			}
		} catch (Exception e) {
			System.err.println(e);
		}
	}

}
