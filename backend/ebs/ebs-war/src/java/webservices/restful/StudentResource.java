/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Admin;
import entity.Event;
import entity.Student;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.naming.InitialContext;
import javax.naming.NamingException;
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
import session.EventSessionLocal;
import session.StudentSessionLocal;
import util.exception.EventNotFoundException;
import util.exception.StudentExistsException;
import util.exception.StudentNotFoundException;

/**
 * REST Web Service
 *
 * @author lt123
 */
@Path("student")
public class StudentResource {

    @EJB
    private EventSessionLocal eventSessionLocal;

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

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response createStudent(Student s) {
        try {
            studentSession.createStudent(s.getUsername(), s.getName(), s.getEmail(), s.getContact(), s.getExchangeUni(), s.getOriginUni(), s.getPassword());
            return Response.ok().build();
        } catch (StudentExistsException e) {
            return Response.status(Response.Status.CONFLICT).entity("Student already exists").build();
        }
    }

    @GET
    @Path("/{studentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveStudentById(@PathParam("studentId") Long studentId) {
        try {
            Student student = studentSession.retrieveStudentById(studentId);

            student.setEventsCreated(new ArrayList<>());
            student.setEventsJoined(new ArrayList<>());
            student.setPostsCreated(new ArrayList<>());
            student.setThreadsCreated(new ArrayList<>());

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
    @Path("/{studentId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateStudentProfile(@PathParam("studentId") Long studentId, Student studentToUpdate) {
        try {
            studentToUpdate.setId(studentId);
            studentSession.updateStudentProfile(studentToUpdate);
            return Response.ok("Student profile updated successfully").build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }

    @PUT
    @Path("/changePassword/{studentId}}")
    public Response changePassword(@PathParam("studentId") Long studentId,
            Student s) {
        try {
            studentSession.changePassword(studentId, s.getPassword());
            return Response.ok("Password changed successfully").build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }

    @GET
    @Path("/{studentId}/eventsCreated")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAllEventsCreated(@PathParam("studentId") Long studentId) {
        try {
            List<Event> events = studentSession.listAllEventsCreated(studentId);
            for (Event e : events) {
                if (e.getAdminCreator() != null) {
                    Admin a = e.getAdminCreator();
                    a.setEventsCreated(new ArrayList<>());
                    a.setPostsCreated(new ArrayList<>());
                    a.setThreadsCreated(new ArrayList<>());
                } else {
                    Student s = e.getStudentCreator();
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }
                e.setEventThread(null);
                e.setStudentsJoined(new ArrayList<>());
            }
            return Response.ok(events).build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }

    @GET
    @Path("/{studentId}/eventsRegistered")
    @Produces(MediaType.APPLICATION_JSON)
    public Response viewAllEventsRegistered(@PathParam("studentId") Long studentId) {
        try {
            List<Event> events = studentSession.viewAllEventsRegistered(studentId);
            for (Event e : events) {
                if (e.getAdminCreator() != null) {
                    Admin a = e.getAdminCreator();
                    a.setEventsCreated(new ArrayList<>());
                    a.setPostsCreated(new ArrayList<>());
                    a.setThreadsCreated(new ArrayList<>());
                } else {
                    Student s = e.getStudentCreator();
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }
                e.setEventThread(null);
                e.setStudentsJoined(new ArrayList<>());
            }
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

    @GET
    @Path("/checkEventOwner/{eventId}/{studentId}}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response isEventOwner(@PathParam("eventId") Long eventId,
            @PathParam("studentId") Long studentId) {

        try {
            boolean isOwner = eventSessionLocal.isStudentEventOwner(eventId, studentId);
            return Response.ok(isOwner).build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event or Student not found").build();
        }
    }
}