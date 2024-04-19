package session;

import entity.Admin;
import entity.Post;
import entity.Thread;
import entity.Student;
import util.exception.AdminNotFoundException;
import java.util.List;
import util.exception.PostNotFoundException;
import util.exception.ThreadNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
public interface ThreadSessionLocal {

    public void studentCreateThread(Long studentId, String title, String description, String tag) throws StudentNotFoundException;

    public void adminCreateThread(Long adminId, String title, String description, String tag) throws AdminNotFoundException;

    public void adminDeleteThread(Long threadId, Long adminId) throws ThreadNotFoundException, AdminNotFoundException, PostNotFoundException, StudentNotFoundException;

    public void studentDeleteThread(Long threadId, Long studentId) throws ThreadNotFoundException, AdminNotFoundException, PostNotFoundException, StudentNotFoundException;

    public void updateThread(Long threadId) throws ThreadNotFoundException;

    public Thread retrieveThreadById(Long threadId) throws ThreadNotFoundException;

    public Student retrieveStudentByThread(Long threadId) throws ThreadNotFoundException;

    public Admin retrieveAdminByThread(Long threadId) throws ThreadNotFoundException;

    public List<Thread> getAllThreads();

    public List<Post> getPostInThreads(Long threadId) throws ThreadNotFoundException;

    public List<Thread> searchThreadByTags(String Tag) ;
}
