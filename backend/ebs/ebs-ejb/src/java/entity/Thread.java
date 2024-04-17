/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

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
    private String desc; // Description of the Thread and what it entails, what the rules are, etc.
    private ArrayList<String> tags;
    private int postCount;
    private int shareCount;

    @ManyToOne
    private Student threadCreator;
    @OneToMany(mappedBy = "parentThread", fetch = FetchType.EAGER)
    private List<Thread> subThreads = new ArrayList<>();
    //If a student wishes to divulge in a subtopic of the thread, He/She can create a subThread.
    @ManyToOne
    private Thread parentThread;
    //if the current thread is a subThread, this attribute pertains to the Parent Thread
    @OneToMany(mappedBy = "prevPost") // NOT SURE
    private List<Post> postsInThread = new ArrayList<>();

    @OneToOne(mappedBy = "eventThread")
    private Event eventCreated;

    public Thread() {
    }
    
    public Thread(String title, String desc, ArrayList<String> tags) {
        this.title = title;
        this.desc = desc;
        this.tags = tags;
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
     * @return the desc
     */
    public String getDesc() {
        return desc;
    }

    /**
     * @param desc the desc to set
     */
    public void setDesc(String desc) {
        this.desc = desc;
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
     * @return the threadCreator
     */
    public Student getThreadCreator() {
        return threadCreator;
    }

    /**
     * @param threadCreator the threadCreator to set
     */
    public void setThreadCreator(Student threadCreator) {
        this.threadCreator = threadCreator;
    }

    /**
     * @return the subThreads
     */
    public List<Thread> getSubThreads() {
        return subThreads;
    }

    /**
     * @param subThreads the subThreads to set
     */
    public void setSubThreads(List<Thread> subThreads) {
        this.subThreads = subThreads;
    }

    /**
     * @return the parentThread
     */
    public Thread getParentThread() {
        return parentThread;
    }

    /**
     * @param parentThread the parentThread to set
     */
    public void setParentThread(Thread parentThread) {
        this.parentThread = parentThread;
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

}
