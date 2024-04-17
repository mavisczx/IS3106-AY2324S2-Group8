package util.exception;

/**
 *
 * @author kaavya
 */

public class ThreadNotFoundException extends Exception {
        public ThreadNotFoundException() {
    }
    public ThreadNotFoundException(String msg) {
        super(msg);
    }
}
