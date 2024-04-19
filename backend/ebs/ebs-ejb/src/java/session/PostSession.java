package session;

import entity.Admin;
import entity.Post;
import entity.Student;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import util.exception.AdminNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
@Stateless
public class PostSession implements PostSessionLocal {

    @PersistenceContext
    private EntityManager em;

    @EJB
    private StudentSessionLocal studentSessionLocal;

    @EJB
    private AdminSessionLocal adminSessionLocal;

    @Override
    public void studentCreatePost(Long studentId, String postDescription, String tag, String imageURL) throws StudentNotFoundException {
        Student student = studentSessionLocal.retrieveStudentById(studentId);

        Post post = new Post(postDescription, tag, imageURL);
        //adding post to Students list of Posts
        student.getPostsCreated().add(post);

        em.persist(post);
    }

    @Override
    public void adminCreatePost(Long adminId, String postDescription, String tag, String imageURL) throws AdminNotFoundException {
        Admin admin = adminSessionLocal.retrieveAdminById(adminId);

        Post post = new Post(postDescription, tag, imageURL);
        //adding post to Students list of Posts
        admin.getPostsCreated().add(post);

        em.persist(post);
    }

    @Override
    public void deletePost(Long postId) throws PostNotFoundException {

        Post post = retrievePostById(postId);

        em.remove(post);
    }

    @Override
    public void updatePost(Long postId) throws PostNotFoundException {
        Post post = retrievePostById(postId);

        post.setPostDescription(post.getPostDescription());
        post.setTag(post.getTag());
        post.setImageURL(post.getImageURL());

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

}
