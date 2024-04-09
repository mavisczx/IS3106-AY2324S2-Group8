/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Admin;
import entity.Event;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.NoResultException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
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

    @GET
    @Path("/create/{username}&{name}&{email}&{contact}&{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAdmin(@PathParam("username") String username,
            @PathParam("name") String name, @PathParam("email") String email,
            @PathParam("contact") String contact, @PathParam("password") String password) {
        
        adminSession.createAdmin( username,  name,  email,  contact,  password);
        
        try {
            Admin admin = adminSession.login(email, password);
            return Response.ok(admin).build();
        } catch (InvalidLoginException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin creation failed").build();
        }
    }
    
    @GET
    @Path("/login/{username}&{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@PathParam("email") String email, @PathParam("password") String password) {
        try {
            Admin admin = adminSession.login(email, password);
            return Response.ok(admin).build();
        } catch (InvalidLoginException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin creation failed").build();
        }
    }
    
    @GET
    @Path("/id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAdminById(@PathParam("id") long id) {
        try {
            Admin admin = adminSession.retrieveAdminById(id);
            return Response.ok(admin).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin creation failed").build();
        }
    }
    
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(Admin admin) {
        try {
            adminSession.updateAdminProfile(admin);
            return Response.ok().build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }
    
    @GET
    @Path("/passwordChange/{id}&{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(@PathParam("id") long id, @PathParam("password") String password) {
        try {
            adminSession.changePassword(id, password);
            return Response.ok().build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }    
    
    @GET
    @Path("/createdEvents/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(@PathParam("id") long id) {
        try {
            List<Event> eventList = adminSession.listAllEventsCreated(id);
            return Response.ok(eventList).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }    


}
