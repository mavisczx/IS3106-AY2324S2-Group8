/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package session;

import entity.Admin;
import entity.Event;
import entity.Student;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author chewy
 */
@Stateless
public class EventSession implements EventSessionLocal {

    @EJB
    private AdminSessionLocal adminSessionLocal;

    @EJB
    private StudentSessionLocal studentSessionLocal;

    @PersistenceContext
    private EntityManager em;

    @Override
    public void studentCreateEvent(Long creatorId, String eventTitle, Date eventDate, String eventLocation, String eventDescription, String eventCategory, Date deadline, String eventPrice) throws StudentNotFoundException {
        Student student = studentSessionLocal.retrieveStudentById(creatorId);
        Event eventToCreate = new Event(eventTitle, eventDate, eventLocation, eventDescription, eventCategory, deadline, eventPrice);

        student.getEventsCreated().add(eventToCreate);
        eventToCreate.setStudentCreator(student);

        em.persist(eventToCreate);
    }

    @Override
    public void adminCreateEvent(Long creatorId, String eventTitle, Date eventDate, String eventLocation, String eventDescription, String eventCategory, Date deadline, String eventPrice) throws AdminNotFoundException {
        Admin admin = adminSessionLocal.retrieveAdminById(creatorId);
        Event eventToCreate = new Event(eventTitle, eventDate, eventLocation, eventDescription, eventCategory, deadline, eventPrice);

        admin.getEventsCreated().add(eventToCreate);
        eventToCreate.setAdminCreator(admin);

        em.persist(eventToCreate);
    }

    @Override
    public boolean eventOwner(Long eventId, Long studentId) throws EventNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Event getEventById(Long eventId) throws EventNotFoundException {
        Event event = em.find(Event.class, eventId);
        if (event != null) {
            return event;
        } else {
            throw new EventNotFoundException("Event not found!");
        }
    }

    @Override
    public void editEvent(Event eventToUpdate) throws EventNotFoundException {
        Event event = getEventById(eventToUpdate.getId());
        event.setDeadline(eventToUpdate.getDeadline());
        event.setEventDescription(eventToUpdate.getEventDescription());
        event.setEventTitle(eventToUpdate.getEventTitle());
        event.setEventCategory(eventToUpdate.getEventCategory());
        event.setEventPrice(eventToUpdate.getEventPrice());
    }

    @Override
    public void studentDeleteEvent(Long eventId) throws EventNotFoundException {
        Event event = getEventById(eventId);
        Student studentCreator = event.getStudentCreator();

        studentCreator.getEventsCreated().remove(event);

        List<Student> studentsJoined = event.getStudentsJoined();
        for (int i = 0; i < studentsJoined.size(); i++) {
            studentsJoined.get(i).getEventsJoined().remove(event);
        }

        event.setStudentsJoined(new ArrayList<Student>());
        em.remove(event);
    }

    @Override
    public void adminDeleteEvent(Long eventId) throws EventNotFoundException {
        Event event = getEventById(eventId);
        Admin adminCreator = event.getAdminCreator();

        adminCreator.getEventsCreated().remove(event);

        List<Student> studentsJoined = event.getStudentsJoined();
        for (int i = 0; i < studentsJoined.size(); i++) {
            studentsJoined.get(i).getEventsJoined().remove(event);
        }

        event.setStudentsJoined(new ArrayList<Student>());
        em.remove(event);
    }

    @Override
    public List<Student> viewAllRegistered(Long eventId) throws EventNotFoundException {
        Event event = getEventById(eventId);
        return event.getStudentsJoined();
    }

    @Override
    public List<Event> searchEventsByTitle(String title) {
        Query query = em.createQuery("SELECT e FROM Event e WHERE LOWER(e.eventTitle) LIKE :inTitle");
        query.setParameter("inTitle", "%" + title.toLowerCase() + "%");
        return query.getResultList();
    }

    @Override
    public List<Event> searchEventByDate(Date eventDate) {
        Query query = em.createQuery("SELECT e FROM Event e WHERE e.eventDate LIKE :inDate");
        query.setParameter("inDate", eventDate);
        return query.getResultList();
    }

    @Override
    public List<Event> searchEventByDeadline(Date deadline) {
        Query query = em.createQuery("SELECT e FROM Event e WHERE e.deadline LIKE :inDeadline");
        query.setParameter("inDeadline", deadline);
        return query.getResultList();
    }

    @Override
    public List<Event> searchEventByLocation(String location) {
        Query query = em.createQuery("SELECT e FROM Event e WHERE LOWER(e.eventLocation) LIKE :inLocation");
        query.setParameter("inLocation", "%" + location.toLowerCase() + "%");
        return query.getResultList();
    }

    @Override
    public List<Event> searchEventByCategory(String category) {
        Query query = em.createQuery("SELECT e FROM Event e WHERE LOWER(e.eventCategory) LIKE :inCategory");
        query.setParameter("inCategory", "%" + category.toLowerCase() + "%");
        return query.getResultList();
    }

    @Override
    public List<Event> searchEventByPrice(String price) {
        Query query = em.createQuery("SELECT e FROM Event e WHERE LOWER(e.eventPrice) LIKE :inPrice");
        query.setParameter("inPrice", "%" + price.toLowerCase() + "%");
        return query.getResultList();
    }

    @Override
    public List<Event> searchAllEvents() {
        Query query = em.createQuery("SELECT e FROM Event e");
        return query.getResultList();
    }

}
