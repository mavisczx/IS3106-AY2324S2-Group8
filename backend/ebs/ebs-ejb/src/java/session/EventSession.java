/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package session;

import entity.Admin;
import entity.Event;
import entity.Student;
import entity.Thread;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TemporalType;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;
import util.exception.ThreadNotFoundException;

/**
 *
 * @author chewy
 */
@Stateless
public class EventSession implements EventSessionLocal {

    @EJB
    private ThreadSessionLocal threadSessionLocal;

    @EJB
    private AdminSessionLocal adminSessionLocal;

    @EJB
    private StudentSessionLocal studentSessionLocal;

    @PersistenceContext
    private EntityManager em;

    @Override
    public void studentCreateEvent(Long creatorId, String eventTitle, Date eventDate, String eventLocation, String eventDescription, String eventCategory, Date deadline, String eventPrice) throws StudentNotFoundException {
        Student student = studentSessionLocal.retrieveStudentById(creatorId);
        Calendar eDate = Calendar.getInstance();
        eDate.setTime(eventDate);
        eDate.set(Calendar.HOUR_OF_DAY, 0);
        eDate.set(Calendar.MINUTE, 0);
        eDate.set(Calendar.SECOND, 0);
        eDate.set(Calendar.MILLISECOND, 0);

        Calendar deadlineDate = Calendar.getInstance();
        deadlineDate.setTime(deadline);
        deadlineDate.set(Calendar.HOUR_OF_DAY, 0);
        deadlineDate.set(Calendar.MINUTE, 0);
        deadlineDate.set(Calendar.SECOND, 0);
        deadlineDate.set(Calendar.MILLISECOND, 0);

        Event eventToCreate = new Event(eventTitle, eDate.getTime(), eventLocation, eventDescription, eventCategory, deadlineDate.getTime(), eventPrice);

        student.getEventsCreated().add(eventToCreate);
        eventToCreate.setStudentCreator(student);

        em.persist(eventToCreate);
    }

    @Override
    public void adminCreateEvent(Long creatorId, String eventTitle, Date eventDate, String eventLocation, String eventDescription, String eventCategory, Date deadline, String eventPrice) throws AdminNotFoundException {
        Admin admin = adminSessionLocal.retrieveAdminById(creatorId);

        Calendar eDate = Calendar.getInstance();
        eDate.setTime(eventDate);
        eDate.set(Calendar.HOUR_OF_DAY, 0);
        eDate.set(Calendar.MINUTE, 0);
        eDate.set(Calendar.SECOND, 0);
        eDate.set(Calendar.MILLISECOND, 0);

        Calendar deadlineDate = Calendar.getInstance();
        deadlineDate.setTime(deadline);
        deadlineDate.set(Calendar.HOUR_OF_DAY, 0);
        deadlineDate.set(Calendar.MINUTE, 0);
        deadlineDate.set(Calendar.SECOND, 0);
        deadlineDate.set(Calendar.MILLISECOND, 0);

        Event eventToCreate = new Event(eventTitle, eDate.getTime(), eventLocation, eventDescription, eventCategory, deadlineDate.getTime(), eventPrice);

        admin.getEventsCreated().add(eventToCreate);
        eventToCreate.setAdminCreator(admin);

        em.persist(eventToCreate);
    }

    @Override
    public boolean isStudentEventOwner(Long eventId, Long studentId) throws EventNotFoundException {
        Event event = getEventById(eventId);
        Student creatorId = event.getStudentCreator();
        if (creatorId != null) {
            if (studentId.equals(creatorId.getId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean isAdminEventOwner(Long eventId, Long adminId) throws EventNotFoundException {
        Event event = getEventById(eventId);
        Admin creatorId = event.getAdminCreator();
        if (creatorId != null) {
            if (adminId.equals(creatorId.getId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
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
    public void studentDeleteEvent(Long eventId) throws EventNotFoundException, ThreadNotFoundException, AdminNotFoundException, PostNotFoundException, StudentNotFoundException {
        Event event = getEventById(eventId);
        Student studentCreator = event.getStudentCreator();

        studentCreator.getEventsCreated().remove(event);

        List<Student> studentsJoined = event.getStudentsJoined();
        for (int i = 0; i < studentsJoined.size(); i++) {
            studentsJoined.get(i).getEventsJoined().remove(event);
        }

        Thread t = event.getEventThread();
        if (t != null) {
            threadSessionLocal.studentDeleteThread(t.getId(), studentCreator.getId());
        }

        event.setStudentsJoined(new ArrayList<Student>());
        em.remove(event);
    }

    @Override
    public void adminDeleteEvent(Long eventId) throws EventNotFoundException, ThreadNotFoundException, AdminNotFoundException, PostNotFoundException, StudentNotFoundException {
        Event event = getEventById(eventId);
        Admin adminCreator = event.getAdminCreator();

        adminCreator.getEventsCreated().remove(event);

        List<Student> studentsJoined = event.getStudentsJoined();
        for (int i = 0; i < studentsJoined.size(); i++) {
            studentsJoined.get(i).getEventsJoined().remove(event);
        }

        Thread t = event.getEventThread();
        if (t != null) {
            threadSessionLocal.adminDeleteThread(t.getId(), adminCreator.getId());
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
    public List<Event> searchEventByDate(Date startDate, Date endDate) {
        Calendar start = Calendar.getInstance();
        start.setTime(startDate);
        start.set(Calendar.HOUR_OF_DAY, 0);
        start.set(Calendar.MINUTE, 0);
        start.set(Calendar.SECOND, 0);
        start.set(Calendar.MILLISECOND, 0);

        Calendar end = Calendar.getInstance();
        end.setTime(endDate);
        end.set(Calendar.HOUR_OF_DAY, 0);
        end.set(Calendar.MINUTE, 0);
        end.set(Calendar.SECOND, 0);
        end.set(Calendar.MILLISECOND, 0);

        Query query = em.createQuery("SELECT e FROM Event e WHERE e.eventDate BETWEEN :startDate AND :endDate");
        query.setParameter("startDate", start.getTime(), TemporalType.DATE);
        query.setParameter("endDate", end.getTime(), TemporalType.DATE);
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
