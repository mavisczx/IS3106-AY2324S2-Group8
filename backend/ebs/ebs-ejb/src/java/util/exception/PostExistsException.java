/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Exception.java to edit this template
 */
package util.exception;

/**
 *
 * @author kaavya
 */
public class PostExistsException extends Exception {

    /**
     * Creates a new instance of <code>AdminExistsException</code> without
     * detail message.
     */
    public PostExistsException() {
    }

    /**
     * Constructs an instance of <code>AdminExistsException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public PostExistsException(String msg) {
        super(msg);
    }
}
