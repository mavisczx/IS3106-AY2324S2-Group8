package session;

import entity.Post;
import util.exception.AdminNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author kaavya
 */
public interface PostSessionLocal {

    public void studentCreatePost(Long studentId, String postDescription, String tag, String imageURL) throws StudentNotFoundException;

    public void adminCreatePost(Long adminId, String postDescription, String tag, String imageURL) throws AdminNotFoundException;

    public void deletePost(Long postId) throws PostNotFoundException;

    public void updatePost(Long postId) throws PostNotFoundException;

    public void likePost(Long postId) throws PostNotFoundException;

    public Post retrievePostById(Long postId) throws PostNotFoundException;

    public Boolean isPostReported(Long postId) throws PostNotFoundException;

}
