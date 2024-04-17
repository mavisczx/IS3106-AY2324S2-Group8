/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/J2EE/EJB31/SingletonEjbClass.java to edit this template
 */
package session.singleton;

import entity.Admin;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import session.AdminSessionLocal;
import util.exception.AdminExistsException;

/**
 *
 * @author chewy
 */
@Singleton
@Startup
public class DataInitSession {

    @EJB
    private AdminSessionLocal adminSessionLocal;

    @PersistenceContext(unitName = "ebs-ejbPU")
    private EntityManager em;

    public DataInitSession() {
    }

    @PostConstruct
    public void PostConstruct() {
        if (em.find(Admin.class, 1L) == null) {
            initialiseData();
        }
    }

    private void initialiseData() {
        try {
            adminSessionLocal.createAdmin("admin123", "admin", "admin@admin.com", "12345678", "admin");
        } catch (AdminExistsException ex) {
            ex.printStackTrace();
        }
    }
}
