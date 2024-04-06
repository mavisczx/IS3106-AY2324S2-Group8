/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
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
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String eventTitle;
    private String eventDescription;
    private String eventLocation;
    @Temporal(TemporalType.DATE)
    private Date eventDate;
    @Temporal(TemporalType.DATE)
    private Date deadline;

    @ManyToOne
    private Student eventCreator;

    @OneToOne
    private Thread eventThread;

    @OneToMany(cascade = {CascadeType.REMOVE}, fetch = FetchType.EAGER) //unidirectional, no need map, when event deleted, students also cleared
    private List<Student> studentsJoined = new ArrayList<>();

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
        if (!(object instanceof Event)) {
            return false;
        }
        Event other = (Event) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Event[ id=" + id + " ]";
    }

    /**
     * @return the eventTitle
     */
    public String getEventTitle() {
        return eventTitle;
    }

    /**
     * @param eventTitle the eventTitle to set
     */
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    /**
     * @return the eventDescription
     */
    public String getEventDescription() {
        return eventDescription;
    }

    /**
     * @param eventDescription the eventDescription to set
     */
    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    /**
     * @return the eventLocation
     */
    public String getEventLocation() {
        return eventLocation;
    }

    /**
     * @param eventLocation the eventLocation to set
     */
    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    /**
     * @return the eventDate
     */
    public Date getEventDate() {
        return eventDate;
    }

    /**
     * @param eventDate the eventDate to set
     */
    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    /**
     * @return the deadline
     */
    public Date getDeadline() {
        return deadline;
    }

    /**
     * @param deadline the deadline to set
     */
    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    /**
     * @return the eventCreator
     */
    public Student getEventCreator() {
        return eventCreator;
    }

    /**
     * @param eventCreator the eventCreator to set
     */
    public void setEventCreator(Student eventCreator) {
        this.eventCreator = eventCreator;
    }

    /**
     * @return the eventThread
     */
    public Thread getEventThread() {
        return eventThread;
    }

    /**
     * @param eventThread the eventThread to set
     */
    public void setEventThread(Thread eventThread) {
        this.eventThread = eventThread;
    }

    /**
     * @return the studentsJoined
     */
    public List<Student> getStudentsJoined() {
        return studentsJoined;
    }

    /**
     * @param studentsJoined the studentsJoined to set
     */
    public void setStudentsJoined(List<Student> studentsJoined) {
        this.studentsJoined = studentsJoined;
    }

}
