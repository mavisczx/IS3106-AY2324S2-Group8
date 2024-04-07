/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/SessionLocal.java to edit this template
 */
package session;

import entity.Event;
import entity.Student;
import java.util.Date;
import java.util.List;
import javax.ejb.Local;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author chewy
 */
@Local
public interface EventSessionLocal {

    public void studentCreateEvent(Long creatorId, String eventTitle, Date eventDate, String eventLocation, String eventDescription, String eventCategory, Date deadline, String eventPrice) throws StudentNotFoundException;

    public void adminCreateEvent(Long creatorId, String eventTitle, Date eventDate, String eventLocation, String eventDescription, String eventCategory, Date deadline, String eventPrice) throws AdminNotFoundException;

    public boolean eventOwner(Long eventId, Long studentId) throws EventNotFoundException;

    public Event getEventById(Long eventId) throws EventNotFoundException;

    public void editEvent(Event eventToUpdate) throws EventNotFoundException;

    public void studentDeleteEvent(Long eventId) throws EventNotFoundException;

    public void adminDeleteEvent(Long eventId) throws EventNotFoundException;

    public List<Student> viewAllRegistered(Long eventId) throws EventNotFoundException;

    public List<Event> searchEventsByTitle(String title);

    public List<Event> searchEventByDate(Date eventDate);

    public List<Event> searchEventByDeadline(Date deadline);

    public List<Event> searchEventByLocation(String location);

    public List<Event> searchEventByCategory(String category);

    public List<Event> searchEventByPrice(String price);

    public List<Event> searchAllEvents();
}
