/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Event;
import entity.Student;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.StudentSessionLocal;
import util.exception.EventNotFoundException;
import util.exception.InvalidLoginException;
import util.exception.StudentExistsException;
import util.exception.StudentNotFoundException;

/**
 * REST Web Service
 *
 * @author lt123
 */
@Path("Student")
public class StudentResource {

    StudentSessionLocal studentSession = lookupStudentSessionLocal();


    /**
     * Creates a new instance of StudentResource
     */
    public StudentResource() {
    }


    private StudentSessionLocal lookupStudentSessionLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (StudentSessionLocal) c.lookup("java:global/ebs/ebs-ejb/StudentSession!session.StudentSessionLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
    
    @GET
    @Path("/create/{username}/{name}/{email}/{contact}/{exchangeUni}/{originUni}/{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createStudent(@PathParam("username") String username,
                                  @PathParam("name") String name,
                                  @PathParam("email") String email,
                                  @PathParam("contact") String contact,
                                  @PathParam("exchangeUni") String exchangeUni,
                                  @PathParam("originUni") String originUni,
                                  @PathParam("password") String password) {
        try {
            studentSession.createStudent(username, name, email, contact, exchangeUni, originUni, password);
            return Response.status(Response.Status.CREATED).entity("Student created successfully").build();
        } catch (StudentExistsException e) {
            return Response.status(Response.Status.CONFLICT).entity("Student already exists").build();
        }
    }    
    
    @GET
    @Path("/login/{email}/{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@PathParam("email") String email,
                          @PathParam("password") String password) {
        try {
            Student student = studentSession.login(email, password);
            return Response.ok(student).build();
        } catch (InvalidLoginException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid login credentials").build();
        }
    }
    
    @GET
    @Path("/{studentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveStudentById(@PathParam("studentId") Long studentId) {
        try {
            Student student = studentSession.retrieveStudentById(studentId);
            return Response.ok(student).build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }
    
    @GET
    @Path("/checkUsername/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkUsernameTaken(@PathParam("username") String username) {
        boolean isTaken = studentSession.checkUsernameTaken(username);
        return Response.ok(isTaken).build();
    }
    
    @PUT
    @Path("/updateProfile")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateStudentProfile(Student studentToUpdate) {
        try {
            studentSession.updateStudentProfile(studentToUpdate);
            return Response.ok("Student profile updated successfully").build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }
    
    @PUT
    @Path("/changePassword/{studentId}/{newPassword}")
    public Response changePassword(@PathParam("studentId") Long studentId,
                                   @PathParam("newPassword") String newPassword) {
        try {
            studentSession.changePassword(studentId, newPassword);
            return Response.ok("Password changed successfully").build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }
    
    @GET
    @Path("/{studentId}/events/created")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAllEventsCreated(@PathParam("studentId") Long studentId) {
        try {
            List<Event> events = studentSession.listAllEventsCreated(studentId);
            return Response.ok(events).build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }
    
    @GET
    @Path("/{studentId}/events/registered")
    @Produces(MediaType.APPLICATION_JSON)
    public Response viewAllEventsRegistered(@PathParam("studentId") Long studentId) {
        try {
            List<Event> events = studentSession.viewAllEventsRegistered(studentId);
            return Response.ok(events).build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }
    
    @POST
    @Path("/{eventId}/register/{studentId}")
    public Response registerForEvent(@PathParam("eventId") Long eventId,
                                     @PathParam("studentId") Long studentId) {
        try {
            studentSession.registerForEvent(eventId, studentId);
            return Response.ok("Student registered for event successfully").build();
        } catch (EventNotFoundException | StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event or Student not found").build();
        }
    }
    
    @DELETE
    @Path("/{eventId}/unregister/{studentId}")
    public Response unregisterForEvent(@PathParam("eventId") Long eventId,
                                       @PathParam("studentId") Long studentId) {
        try {
            studentSession.unregisterForEvent(eventId, studentId);
            return Response.ok("Student unregistered from event successfully").build();
        } catch (EventNotFoundException | StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event or Student not found").build();
        }
    }
    
    @GET
    @Path("/checkRegistration/{eventId}/{studentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkRegistrationForEvent(@PathParam("eventId") Long eventId,
                                              @PathParam("studentId") Long studentId) {
        try {
            boolean isRegistered = studentSession.checkRegistrationForEvent(eventId, studentId);
            return Response.ok(isRegistered).build();
        } catch (EventNotFoundException | StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event or Student not found").build();
        }
    }
}
