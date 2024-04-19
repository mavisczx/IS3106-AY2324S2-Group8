/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
    private String tag;
    @Lob
    @Column
    private String imageURL;
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    private int likeCount;
    private boolean ifReported; // To check if the post has been reported by another stu

    @ManyToOne
    private Student studentPostCreator;

    @ManyToOne
    private Admin adminPostCreator;

    public Post() {
    }

    public Post(String postDescription, String tag, String imageURL) {
        this.postDescription = postDescription;
        this.tag = tag;
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
     * @return the tag
     */
    public String getTag() {
        return tag;
    }

    /**
     * @param tag the tag to set
     */
    public void setTag(String tag) {
        this.tag = tag;
    }

    /**
     * @return the imageURL
     */
    public String getImageURL() {
        return imageURL;
    }

    /**
     * @param imageURL the imageURL to set
     */
    public void setImageURL(String imageURL) {
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
     * @return the studentPostCreator
     */
    public Student getStudentPostCreator() {
        return studentPostCreator;
    }

    /**
     * @param studentPostCreator the studentPostCreator to set
     */
    public void setStudentPostCreator(Student studentPostCreator) {
        this.studentPostCreator = studentPostCreator;
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

    public Admin getAdminPostCreator() {
        return adminPostCreator;
    }

    public void setAdminPostCreator(Admin adminPostCreator) {
        this.adminPostCreator = adminPostCreator;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

}
