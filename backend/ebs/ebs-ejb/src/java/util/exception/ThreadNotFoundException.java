/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Exception.java to edit this template
 */

package util.exception;

/**
 *
 * @author kaavya
 */

public class ThreadNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>ThreadNotFoundException</code> without
     * detail message.
     */
    public ThreadNotFoundException() {
    }

    /**
     * Constructs an instance of <code>ThreadNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public ThreadNotFoundException(String msg) {
        super(msg);
    }
}
