package session;

import entity.Student;
import entity.Post;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
public interface PostSessionLocal {

public void createPost(Long studentId, String postDescription, ArrayList<String> tags, ArrayList<String> imageURL) throws StudentNotFoundException;

public void deletePost(Long postId) throws PostNotFoundException;

public void updatePost(Long postId) throws PostNotFoundException;

public void sharePost(Long postId) throws PostNotFoundException;

public void likePost(Long postId)throws PostNotFoundException;

public Post retrievePostById(Long postId) throws PostNotFoundException;

 public Boolean isPostReported(Long postId) throws PostNotFoundException;

public List<Post> getAllPost();

}
