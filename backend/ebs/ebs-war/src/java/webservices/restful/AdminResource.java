/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Admin;
import entity.Event;
import entity.Student;
import entity.Thread;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.AdminSessionLocal;
import util.exception.AdminNotFoundException;
import util.exception.InvalidLoginException;

/**
 * REST Web Service
 *
 * @author lt123
 */
@Path("admin")
public class AdminResource {
    
    AdminSessionLocal adminSession = lookupAdminSessionLocal();

    /**
     * Creates a new instance of AdminResource
     */
    public AdminResource() {
    }
    
    private AdminSessionLocal lookupAdminSessionLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (AdminSessionLocal) c.lookup("java:global/ebs/ebs-ejb/AdminSession!session.AdminSessionLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAdmin(Admin a) {
        
        adminSession.createAdmin(a.getUsername(), a.getName(), a.getEmail(), a.getContact(), a.getPassword());
        
        try {
            Admin admin = adminSession.login(a.getEmail(), a.getPassword());
            return Response.ok().build();
        } catch (InvalidLoginException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin creation failed").build();
        }
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAdminById(@PathParam("id") long id) {
        try {
            Admin admin = adminSession.retrieveAdminById(id);
            
            admin.setEventsCreated(new ArrayList<>());
            admin.setPostsCreated(new ArrayList<>());
            admin.setThreadsCreated(new ArrayList<>());
            
            return Response.ok(admin).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin creation failed").build();
        }
    }
    
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("id") long id, Admin admin) {
        try {
            admin.setId(id);
            adminSession.updateAdminProfile(admin);
            return Response.ok().build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }
    
    @GET
    @Path("/passwordChange/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(@PathParam("id") long id, Admin a) {
        try {
            adminSession.changePassword(id, a.getPassword());
            return Response.ok().build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }
    
    @GET
    @Path("/createdEvents/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCreatedEvents(@PathParam("id") long id) {
        try {
            List<Event> eventList = adminSession.listAllEventsCreated(id);
            
            for (Event e : eventList) {
                e.setAdminCreator(null);
                
                List<Student> studentsJoined = e.getStudentsJoined();
                for (Student s : studentsJoined) {
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }
                
                Thread thread = e.getEventThread();
                thread.setEventCreated(null);
                thread.setParentThread(null);
                thread.setPostsInThread(new ArrayList<>());
                thread.setSubThreads(new ArrayList<>());
                thread.setThreadCreator(null);
            }
            
            return Response.ok(eventList).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }
    
}
