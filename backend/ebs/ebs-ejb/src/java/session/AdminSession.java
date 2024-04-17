/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB30/StatelessEjbClass.java to edit this template
 */
package session;

import entity.Admin;
import entity.Event;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.AdminExistsException;
import util.exception.AdminNotFoundException;
import util.exception.InvalidLoginException;

/**
 *
 * @author chewy
 */
@Stateless
public class AdminSession implements AdminSessionLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createAdmin(String username, String name, String email, String contact, String password)
            throws AdminExistsException {
        Admin adminToCreate = new Admin(username, name, email, contact, password);

        Query query = em.createQuery("SELECT a FROM Admin a WHERE a.email = :inEmail");
        query.setParameter("inEmail", email);

        if (query.getResultList().isEmpty()) {
            em.persist(adminToCreate);
        } else {
            throw new AdminExistsException("An account with this email has already been created!");
        }
    }

    @Override
    public Admin login(String email, String password) throws InvalidLoginException {
        Query query = em.createQuery("SELECT a FROM Admin a WHERE s.email = :inEmail");
        query.setParameter("inEmail", email);

        try {
            Admin admin = (Admin) query.getSingleResult();
            if (admin.getPassword().equals(password)) {
                return admin;
            } else {
                throw new InvalidLoginException("Invalid email or password!");
            }
        } catch (NoResultException ex) {
            throw new InvalidLoginException("Invalid email or password!");
        }
    }

    @Override
    public Admin retrieveAdminById(Long adminId) throws AdminNotFoundException {
        Admin admin = em.find(Admin.class, adminId);

        if (admin != null) {
            return admin;
        } else {
            throw new AdminNotFoundException("Admin with ID " + adminId + " does not exist.");
        }
    }

    @Override
    public void updateAdminProfile(Admin adminToUpdate) throws AdminNotFoundException {
        Admin admin = retrieveAdminById(adminToUpdate.getId());

        admin.setContact(adminToUpdate.getContact());
        admin.setUsername(adminToUpdate.getUsername());
        admin.setProfilePhoto(adminToUpdate.getProfilePhoto());
    }

    @Override
    public void changePassword(Long adminId, String newPassword) throws AdminNotFoundException {
        Admin admin = retrieveAdminById(adminId);
        if (!newPassword.equals(admin.getPassword())) {
            admin.setPassword(newPassword);
        }
    }

    @Override
    public List<Event> listAllEventsCreated(Long adminId) throws AdminNotFoundException {
        Admin admin = retrieveAdminById(adminId);
        return admin.getEventsCreated();
    }

}
