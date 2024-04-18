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
import javax.persistence.OneToMany;

/**
 *
 * @author mavischeng
 */
@Entity
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String profilePhoto;
    private String contact; //any other details like telegram handle!
    private String name;
    private String email; //NOTE TO TEAM: Need to create verification to check if the email follows protocol(SG uni email)
    private String exchangeUni; //Singaporean Uni that the Student currently attends
    private String originUni; //Foreign Uni that the Student currently is from originall

    @OneToMany(mappedBy = "studentPostCreator", fetch = FetchType.EAGER)
    private List<Post> postsCreated = new ArrayList<>();

    @OneToMany(mappedBy = "studentThreadCreator", fetch = FetchType.EAGER)
    private List<Thread> threadsCreated = new ArrayList<>();

    @OneToMany(mappedBy = "studentCreator", fetch = FetchType.EAGER)
    private List<Event> eventsCreated = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER) //unidirectional, no need map
    private List<Event> eventsJoined = new ArrayList<>();

    public Student() {
    }

    public Student(String username, String name, String email, String contact, String exchangeUni, String originUni, String password) {
        this.username = username;
        this.password = password;
        this.contact = contact;
        this.name = name;
        this.email = email;
        this.exchangeUni = exchangeUni;
        this.originUni = originUni;
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
        if (!(object instanceof Student)) {
            return false;
        }
        Student other = (Student) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Student[ id=" + id + " ]";
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getExchangeUni() {
        return exchangeUni;
    }

    public void setExchangeUni(String exchangeUni) {
        this.exchangeUni = exchangeUni;
    }

    public String getOriginUni() {
        return originUni;
    }

    public void setOriginUni(String originUni) {
        this.originUni = originUni;
    }

    public List<Post> getPostsCreated() {
        return postsCreated;
    }

    public void setPostsCreated(List<Post> postsCreated) {
        this.postsCreated = postsCreated;
    }

    public List<Thread> getThreadsCreated() {
        return threadsCreated;
    }

    public void setThreadsCreated(List<Thread> threadsCreated) {
        this.threadsCreated = threadsCreated;
    }

    public List<Event> getEventsCreated() {
        return eventsCreated;
    }

    public void setEventsCreated(List<Event> eventsCreated) {
        this.eventsCreated = eventsCreated;
    }

    public List<Event> getEventsJoined() {
        return eventsJoined;
    }

    public void setEventsJoined(List<Event> eventsJoined) {
        this.eventsJoined = eventsJoined;
    }

}
