package session;

import entity.Post;
import entity.Student;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.PostNotFoundException;

/**
 *
 * @author kaavya
 */

@Stateless
public class PostSession implements PostSessionLocal{
@PersistenceContext
private EntityManager em;
    
@Override
public void createPost(String postDescription, ArrayList<String> tags, ArrayList<String> imageURL) {
  Post postToCreate = new Post(postDescription, tags, imageURL);
  em.persist(postToCreate);
}

@Override
public void deletePost(Long postId) throws PostNotFoundException{
   Post post = retrievePostById(postId);
   em.remove(post);
}

@Override
public void updatePost(Long postId) throws PostNotFoundException {
   Post post = retrievePostById(postId);
        post.setPostDescription(post.getPostDescription());
        post.setTags(post.getTags());
        post.setImageURL(post.getImageURL());
}

@Override
public void sharePost(Long postId) throws PostNotFoundException {
    Post post = retrievePostById(postId);
    int shareCount = post.getShareCount();
    shareCount++;
    post.setShareCount(shareCount);
    // figure out how to acutally send the 'msg'

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

}
