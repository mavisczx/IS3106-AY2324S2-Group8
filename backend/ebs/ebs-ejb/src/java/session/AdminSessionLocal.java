/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/SessionLocal.java to edit this template
 */
package session;

import entity.Admin;
import entity.Event;
import java.util.List;
import javax.ejb.Local;
import util.exception.AdminNotFoundException;
import util.exception.InvalidLoginException;

/**
 *
 * @author chewy
 */
@Local
public interface AdminSessionLocal {

    public void createAdmin(String username, String name, String email, String contact, String password);

    public Admin login(String email, String password) throws InvalidLoginException;

    public Admin retrieveAdminById(Long adminId) throws AdminNotFoundException;

    public void updateAdminProfile(Admin adminToUpdate) throws AdminNotFoundException;

    public void changePassword(Long adminId, String newPassword) throws AdminNotFoundException;

    public List<Event> listAllEventsCreated(Long adminId) throws AdminNotFoundException;

}
