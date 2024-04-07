/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/SessionLocal.java to edit this template
 */
package session;

import entity.Event;
import entity.Student;
import java.util.List;
import javax.ejb.Local;
import util.exception.EventNotFoundException;
import util.exception.InvalidLoginException;
import util.exception.StudentExistsException;
import util.exception.StudentNotFoundException;

/**
 *
 * @author mavischeng
 */
@Local
public interface StudentSessionLocal {

    public void createStudent(String username, String name, String email, String contact, String exchangeUni, String originUni, String password) throws StudentExistsException;

    public Student login(String email, String password) throws InvalidLoginException;

    public Student retrieveStudentById(Long studentId) throws StudentNotFoundException;

    public boolean checkUsernameTaken(String username);

    public void updateStudentProfile(Student studentToUpdate) throws StudentNotFoundException;

    public void changePassword(Long studentId, String newPassword) throws StudentNotFoundException;

    public List<Event> listAllEventsCreated(Long studentId) throws StudentNotFoundException;

    public List<Event> viewAllEventsRegistered(Long studentId) throws StudentNotFoundException;

    public void registerForEvent(Long eventId, Long studentId) throws EventNotFoundException, StudentNotFoundException;

    public void unregisterForEvent(Long eventId, Long studentId) throws EventNotFoundException, StudentNotFoundException;

    public boolean checkRegistrationForEvent(Long eventId, Long studentId) throws EventNotFoundException, StudentNotFoundException;

}
