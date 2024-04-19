package session;

import entity.Post;
import java.util.List;
import util.exception.AdminNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
public interface PostSessionLocal {

    public void studentCreatePost(Long studentId, String postDescription) throws StudentNotFoundException;

    public void adminCreatePost(Long adminId, String postDescription) throws AdminNotFoundException;

    public void adminDeletePost(Long postId, Long adminId) throws PostNotFoundException, AdminNotFoundException;

    public void studentDeletePost(Long postId, Long studentId) throws PostNotFoundException, StudentNotFoundException;

    public void updatePost(Long postId) throws PostNotFoundException;

    public void likePost(Long postId) throws PostNotFoundException;

    public Post retrievePostById(Long postId) throws PostNotFoundException;

    public Boolean isPostReported(Long postId) throws PostNotFoundException;

    public List<Post> getAllPost();

}
