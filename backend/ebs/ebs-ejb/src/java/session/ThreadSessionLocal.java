package session;

import entity.Admin;
import entity.Thread;
import entity.Student;
import util.exception.AdminNotFoundException;
import util.exception.ThreadNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
public interface ThreadSessionLocal {

    public void studentCreateThread(Long studentId, String title, String description, String tag) throws StudentNotFoundException;

    public void adminCreateThread(Long adminId, String title, String description, String tag) throws AdminNotFoundException;

    public void deleteThread(Long threadId) throws ThreadNotFoundException;

    public void updateThread(Long threadId) throws ThreadNotFoundException;

    public Thread retrieveThreadById(Long threadId) throws ThreadNotFoundException;

    public Student retrieveStudentByThread(Long threadId) throws ThreadNotFoundException;

    public Admin retrieveAdminByThread(Long threadId) throws ThreadNotFoundException;
}
