/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author mavischeng
 */
@Entity
public class Thread implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description; // Description of the Thread and what it entails, what the rules are, etc.
    private String tag;
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    private int postCount;

    @ManyToOne
    private Student studentThreadCreator;

    @ManyToOne
    private Admin adminThreadCreator;

    @OneToMany(mappedBy = "postThread")
    private List<Post> postsInThread = new ArrayList<>();

    @OneToOne
    private Event eventCreated;

    public Thread() {
    }

    public Thread(String title, String description, String tag) {
        this.title = title;
        this.description = description;
        this.tag = tag;
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
        if (!(object instanceof Thread)) {
            return false;
        }
        Thread other = (Thread) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Thread[ id=" + id + " ]";
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
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
     * @return the postCount
     */
    public int getPostCount() {
        return postCount;
    }

    /**
     * @param postCount the postCount to set
     */
    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }

    /**
     * @return the studentThreadCreator
     */
    public Student getStudentThreadCreator() {
        return studentThreadCreator;
    }

    /**
     * @param studentThreadCreator the studentThreadCreator to set
     */
    public void setStudentThreadCreator(Student studentThreadCreator) {
        this.studentThreadCreator = studentThreadCreator;
    }

    /**
     * @return the postsInThread
     */
    public List<Post> getPostsInThread() {
        return postsInThread;
    }

    /**
     * @param postsInThread the postsInThread to set
     */
    public void setPostsInThread(List<Post> postsInThread) {
        this.postsInThread = postsInThread;
    }

    /**
     * @return the eventCreated
     */
    public Event getEventCreated() {
        return eventCreated;
    }

    /**
     * @param eventCreated the eventCreated to set
     */
    public void setEventCreated(Event eventCreated) {
        this.eventCreated = eventCreated;
    }

    public Admin getAdminThreadCreator() {
        return adminThreadCreator;
    }

    public void setAdminThreadCreator(Admin adminThreadCreator) {
        this.adminThreadCreator = adminThreadCreator;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

}
