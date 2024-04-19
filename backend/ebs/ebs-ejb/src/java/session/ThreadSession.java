package session;

import entity.Admin;
import entity.Post;
import entity.Thread;
import entity.Student;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.AdminNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.ThreadNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
@Stateless
public class ThreadSession implements ThreadSessionLocal {

    @EJB
    private PostSessionLocal postSessionLocal;

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
        thread.setCreationDate(new Date());
        thread.setStudentThreadCreator(student);
        student.getThreadsCreated().add(thread);

        em.persist(thread);
    }

    @Override
    public void adminCreateThread(Long adminId, String title, String description, String tag) throws AdminNotFoundException {
        Admin admin = adminSessionLocal.retrieveAdminById(adminId);

        Thread thread = new Thread(title, description, tag);
        thread.setCreationDate(new Date());
        thread.setAdminThreadCreator(admin);
        admin.getThreadsCreated().add(thread);

        em.persist(thread);
    }

    @Override
    public void adminDeleteThread(Long threadId, Long adminId) throws ThreadNotFoundException, AdminNotFoundException, PostNotFoundException, StudentNotFoundException {

        Thread thread = retrieveThreadById(threadId);
        Admin admin = adminSessionLocal.retrieveAdminById(adminId);
        List<Post> posts = thread.getPostsInThread();
        for (int i = 0; i < posts.size(); i++) {
            Post p = posts.get(i);
            if (p.getAdminPostCreator() != null) {
                postSessionLocal.adminDeletePost(p.getId(), p.getAdminPostCreator().getId());
            } else {
                postSessionLocal.studentDeletePost(p.getId(), p.getStudentPostCreator().getId());
            }
        }

        admin.getThreadsCreated().remove(thread);
        thread.setAdminThreadCreator(null);
        thread.setPostsInThread(new ArrayList<>());
        em.remove(thread);
    }

    @Override
    public void studentDeleteThread(Long threadId, Long studentId) throws ThreadNotFoundException, AdminNotFoundException, PostNotFoundException, StudentNotFoundException {

        Thread thread = retrieveThreadById(threadId);
        Student student = studentSessionLocal.retrieveStudentById(studentId);
        List<Post> posts = thread.getPostsInThread();
        for (int i = 0; i < posts.size(); i++) {
            Post p = posts.get(i);
            if (p.getAdminPostCreator() != null) {
                postSessionLocal.adminDeletePost(p.getId(), p.getAdminPostCreator().getId());
            } else {
                postSessionLocal.studentDeletePost(p.getId(), p.getStudentPostCreator().getId());
            }
        }

        student.getPostsCreated().remove(thread);
        thread.setStudentThreadCreator(null);
        thread.setPostsInThread(new ArrayList<>());
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
    public List<Thread> getAllThreads() {
        Query query = em.createQuery("SELECT e FROM Thread e");
        return query.getResultList();
    }

    @Override
    public Admin retrieveAdminByThread(Long threadId) throws ThreadNotFoundException {
        Thread thread = retrieveThreadById(threadId);
        Admin creatorAdmin = thread.getAdminThreadCreator();

        return creatorAdmin;
    }

    @Override
    public List<Post> getPostInThreads(Long threadId) throws ThreadNotFoundException {
        Thread t = retrieveThreadById(threadId);
        return t.getPostsInThread();
    }

}
