package it.polimi.db2project_telco.client.util;

public class Utils {

    private Utils() {}

    public static String bytesToHexString(byte[] bytes) {
        StringBuilder s = new StringBuilder(2 * bytes.length);
        for(byte b : bytes)
            s.append(String.format("%02x", b));
        return s.toString();
    }
}
