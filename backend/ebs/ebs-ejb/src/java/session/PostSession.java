package session;

import entity.Admin;
import entity.Post;
import entity.Student;
import entity.Thread;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.AdminNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;
import util.exception.ThreadNotFoundException;

/**
 *
 * @author kaavya
 */
@Stateless
public class PostSession implements PostSessionLocal {

    @EJB
    private ThreadSessionLocal threadSessionLocal;

    @PersistenceContext
    private EntityManager em;

    @EJB
    private StudentSessionLocal studentSessionLocal;

    @EJB
    private AdminSessionLocal adminSessionLocal;

    @Override
    public void studentCreatePost(Long studentId, Long threadId, String postDescription) throws StudentNotFoundException, ThreadNotFoundException {
        Student student = studentSessionLocal.retrieveStudentById(studentId);
        Thread thread = threadSessionLocal.retrieveThreadById(threadId);

        Post post = new Post(postDescription);
        //adding post to Students list of Posts
        post.setCreationDate(new Date());

        post.setPostThread(thread);
        thread.getPostsInThread().add(post);

        post.setStudentPostCreator(student);
        student.getPostsCreated().add(post);

        em.persist(post);
    }

    @Override
    public void adminCreatePost(Long adminId, Long threadId, String postDescription) throws AdminNotFoundException, ThreadNotFoundException {
        Admin admin = adminSessionLocal.retrieveAdminById(adminId);
        Thread thread = threadSessionLocal.retrieveThreadById(threadId);

        Post post = new Post(postDescription);
        //adding post to Students list of Posts
        admin.getPostsCreated().add(post);
        post.setAdminPostCreator(admin);

        post.setCreationDate(new Date());

        post.setPostThread(thread);
        thread.getPostsInThread().add(post);
        em.persist(post);
    }

    @Override
    public void adminDeletePost(Long postId, Long adminId) throws PostNotFoundException, AdminNotFoundException {

        Post post = retrievePostById(postId);
        Admin admin = adminSessionLocal.retrieveAdminById(adminId);

        admin.getPostsCreated().remove(post);
        Thread t = post.getPostThread();
        t.getPostsInThread().remove(post);

        post.setAdminPostCreator(null);
        post.setPostThread(null);
        em.remove(post);
    }

    @Override
    public void studentDeletePost(Long postId, Long studentId) throws PostNotFoundException, StudentNotFoundException {

        Post post = retrievePostById(postId);
        Student student = studentSessionLocal.retrieveStudentById(studentId);

        student.getPostsCreated().remove(post);
        Thread t = post.getPostThread();
        t.getPostsInThread().remove(post);

        post.setStudentPostCreator(null);
        post.setPostThread(null);
        em.remove(post);
    }

    @Override
    public void updatePost(Long postId) throws PostNotFoundException {
        Post post = retrievePostById(postId);
        post.setPostDescription(post.getPostDescription());

    }

    @Override
    public void likePost(Long postId) throws PostNotFoundException {

        Post post = retrievePostById(postId);

        int likeCount = post.getLikeCount();
        likeCount++;

        post.setLikeCount(likeCount);
    }

    @Override
    public Post retrievePostById(Long postId) throws PostNotFoundException {

        Post post = em.find(Post.class, postId);

        if (post != null) {
            return post;

        } else {
            throw new PostNotFoundException("Error: Post does not Exist!");
        }
    }

    @Override
    public Boolean isPostReported(Long postId) throws PostNotFoundException {

        Post post = retrievePostById(postId);
        return post.isIfReported();
        //just to check whether post has been reported by any other Student
    }

    @Override
    public List<Post> getAllPost() {
        Query query = em.createQuery("SELECT e FROM Post e");
        return query.getResultList();
    }

}
