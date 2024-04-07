/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Exception.java to edit this template
 */
package util.exception;

/**
 *
 * @author chewy
 */
public class StudentNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>StudentNotFoundException</code> without
     * detail message.
     */
    public StudentNotFoundException() {
    }

    /**
     * Constructs an instance of <code>StudentNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public StudentNotFoundException(String msg) {
        super(msg);
    }
}
