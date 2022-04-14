package it.polimi.db2project_telco.client.util;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@SuppressWarnings("UnnecessaryReturnStatement")
public class ServletErrorResponse {
	public static void createResponse(HttpServletResponse response, int code, String message)
			throws IOException {
		response.setStatus(code);
		response.setContentType("text/html");
		response.getWriter().println(message);
		return;
	}
}