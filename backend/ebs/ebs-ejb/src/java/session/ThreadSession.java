package session;

import entity.Admin;
import entity.Thread;
import entity.Student;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import util.exception.AdminNotFoundException;
import util.exception.ThreadNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
@Stateless
public class ThreadSession implements ThreadSessionLocal {

    @PersistenceContext
    private EntityManager em;

    @EJB
    private StudentSessionLocal studentSessionLocal;

    @EJB
    private AdminSessionLocal adminSessionLocal;

    @Override
    public void studentCreateThread(Long studentId, String title, String description, String tag) throws StudentNotFoundException {
        Student student = studentSessionLocal.retrieveStudentById(studentId);

        Thread thread = new Thread(title, description, tag);
        student.getThreadsCreated().add(thread);

        em.persist(thread);
    }

    @Override
    public void adminCreateThread(Long adminId, String title, String description, String tag) throws AdminNotFoundException {
        Admin admin = adminSessionLocal.retrieveAdminById(adminId);

        Thread thread = new Thread(title, description, tag);
        admin.getThreadsCreated().add(thread);

        em.persist(thread);
    }

    @Override
    public void deleteThread(Long threadId) throws ThreadNotFoundException {
        Thread thread = retrieveThreadById(threadId);

        em.remove(thread);
    }

    @Override
    public void updateThread(Long threadId) throws ThreadNotFoundException {
        Thread thread = retrieveThreadById(threadId);

        thread.setTitle(thread.getTitle());
        thread.setDescription(thread.getDescription());
        thread.setTag(thread.getTag());
    }

    @Override
    public Thread retrieveThreadById(Long threadId) throws ThreadNotFoundException {
        Thread thread = em.find(Thread.class, threadId);

        if (thread != null) {
            return thread;
        } else {
            throw new ThreadNotFoundException("Error: Post does not Exist!");
        }
    }

    @Override
    public Student retrieveStudentByThread(Long threadId) throws ThreadNotFoundException {

        Thread thread = retrieveThreadById(threadId);
        Student creatorStudent = thread.getStudentThreadCreator();

        return creatorStudent;
    }

    @Override
    public Admin retrieveAdminByThread(Long threadId) throws ThreadNotFoundException {
        Thread thread = retrieveThreadById(threadId);
        Admin creatorAdmin = thread.getAdminThreadCreator();

        return creatorAdmin;
    }

}
