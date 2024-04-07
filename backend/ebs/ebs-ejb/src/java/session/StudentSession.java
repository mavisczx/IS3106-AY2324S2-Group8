/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package session;

import entity.Event;
import entity.Student;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.EventNotFoundException;
import util.exception.InvalidLoginException;
import util.exception.StudentExistsException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author mavischeng
 */
@Stateless
public class StudentSession implements StudentSessionLocal {

    @EJB
    private EventSessionLocal eventSessionLocal;

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createStudent(String username, String name, String email, String contact, String exchangeUni, String originUni, String password) throws StudentExistsException {
        Student studentToCreate = new Student(username, name, email, contact, exchangeUni, originUni, password);

        Query query = em.createQuery("SELECT s FROM Student s WHERE s.email = :inEmail");
        query.setParameter("inEmail", email);

        if (query.getResultList().isEmpty()) {
            em.persist(studentToCreate);
        } else {
            throw new StudentExistsException("An account with this email has already been created!");
        }
    }

    @Override
    public Student login(String email, String password) throws InvalidLoginException {
        Query query = em.createQuery("SELECT s FROM Student s WHERE s.email = :inEmail");
        query.setParameter("inEmail", email);

        try {
            Student student = (Student) query.getSingleResult();
            if (student.getPassword().equals(password)) {
                return student;
            } else {
                throw new InvalidLoginException("Invalid email or password!");
            }
        } catch (NoResultException ex) {
            throw new InvalidLoginException("Invalid email or password!");
        }
    }

    @Override
    public Student retrieveStudentById(Long studentId) throws StudentNotFoundException {
        Student student = em.find(Student.class, studentId);

        if (student != null) {
            return student;
        } else {
            throw new StudentNotFoundException("Student with ID " + studentId + " does not exist.");
        }
    }

    @Override
    public boolean checkUsernameTaken(String username) {
        Query query = em.createQuery("SELECT s FROM Student s WHERE s.username = :inUsername");
        query.setParameter("inUsername", username);

        if (query.getResultList().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void updateStudentProfile(Student studentToUpdate) throws StudentNotFoundException { // see what we want to update
        Student student = retrieveStudentById(studentToUpdate.getId());

        student.setContact(studentToUpdate.getContact());
        student.setUsername(studentToUpdate.getUsername());
        student.setProfilePhoto(studentToUpdate.getProfilePhoto());
    }

    @Override
    public void changePassword(Long studentId, String newPassword) throws StudentNotFoundException {
        Student student = retrieveStudentById(studentId);
        if (!newPassword.equals(student.getPassword())) {
            student.setPassword(newPassword);
        }
    }

    @Override
    public List<Event> listAllEventsCreated(Long studentId) throws StudentNotFoundException {
        Student student = retrieveStudentById(studentId);
        return student.getEventsCreated();
    }

    @Override
    public List<Event> viewAllEventsRegistered(Long studentId) throws StudentNotFoundException {
        Student student = retrieveStudentById(studentId);
        return student.getEventsJoined();
    }

    @Override
    public void registerForEvent(Long eventId, Long studentId) throws EventNotFoundException, StudentNotFoundException {
        Event event = eventSessionLocal.getEventById(eventId);
        Student student = retrieveStudentById(studentId);

        event.getStudentsJoined().add(student);
        student.getEventsJoined().add(event);
    }

    @Override
    public void unregisterForEvent(Long eventId, Long studentId) throws EventNotFoundException, StudentNotFoundException {
        Event event = eventSessionLocal.getEventById(eventId);
        Student student = retrieveStudentById(studentId);

        event.getStudentsJoined().remove(student);
        student.getEventsJoined().remove(event);
    }

    @Override
    public boolean checkRegistrationForEvent(Long eventId, Long studentId) throws EventNotFoundException, StudentNotFoundException {
        Event event = eventSessionLocal.getEventById(eventId);
        Student student = retrieveStudentById(studentId);

        for (Event e : student.getEventsJoined()) {
            if (e.getId().equals(eventId)) {
                return true;
            }
        }
        return false;
    }

}
