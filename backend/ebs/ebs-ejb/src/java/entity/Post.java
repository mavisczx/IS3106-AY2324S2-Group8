/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

/**
 *
 * @author mavischeng
 */
@Entity
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postDescription; //Post Description
    private ArrayList<String> tags;
    private ArrayList<String> imageURL;
    private int likeCount;
    private int shareCount;
    private boolean ifReported; // To check if the post has been reported by another stu

    @ManyToOne
    private Student postCreator;
    @ManyToMany
    private List<Post> replies = new ArrayList<>();
    @ManyToOne
    private Post prevPost; //If the current post was a reply to another post( This is the attribute pertaining to the previous post)

    public Post() {
    }
    
    public Post(String postDescription, ArrayList<String> tags, ArrayList<String> imageURL) {
        this.postDescription = postDescription;
        this.tags = tags;
        this.imageURL = imageURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Post)) {
            return false;
        }
        Post other = (Post) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Post[ id=" + id + " ]";
    }

    /**
     * @return the tags
     */
    public ArrayList<String> getTags() {
        return tags;
    }

    /**
     * @param tags the tags to set
     */
    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    /**
     * @return the imageURL
     */
    public ArrayList<String> getImageURL() {
        return imageURL;
    }

    /**
     * @param imageURL the imageURL to set
     */
    public void setImageURL(ArrayList<String> imageURL) {
        this.imageURL = imageURL;
    }

    /**
     * @return the likeCount
     */
    public int getLikeCount() {
        return likeCount;
    }

    /**
     * @param likeCount the likeCount to set
     */
    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    /**
     * @return the shareCount
     */
    public int getShareCount() {
        return shareCount;
    }

    /**
     * @param shareCount the shareCount to set
     */
    public void setShareCount(int shareCount) {
        this.shareCount = shareCount;
    }

    /**
     * @return the ifReported
     */
    public boolean isIfReported() {
        return ifReported;
    }

    /**
     * @param ifReported the ifReported to set
     */
    public void setIfReported(boolean ifReported) {
        this.ifReported = ifReported;
    }

    /**
     * @return the postCreator
     */
    public Student getPostCreator() {
        return postCreator;
    }

    /**
     * @param postCreator the postCreator to set
     */
    public void setPostCreator(Student postCreator) {
        this.postCreator = postCreator;
    }

    /**
     * @return the replies
     */
    public List<Post> getReplies() {
        return replies;
    }

    /**
     * @param replies the replies to set
     */
    public void setReplies(List<Post> replies) {
        this.replies = replies;
    }

    /**
     * @return the prevPost
     */
    public Post getPrevPost() {
        return prevPost;
    }

    /**
     * @param prevPost the prevPost to set
     */
    public void setPrevPost(Post prevPost) {
        this.prevPost = prevPost;
    }

    /**
     * @return the postDescription
     */
    public String getPostDescription() {
        return postDescription;
    }

    /**
     * @param postDescription the postDescription to set
     */
    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

}
