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
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonObject;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import session.EventSessionLocal;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;
import util.exception.StudentNotFoundException;

/**
 * REST Web Service
 *
 * @author lt123
 */
@Path("event")
public class EventResource {

    EventSessionLocal eventSession = lookupEventSessionLocal();

    /**
     * Creates a new instance of EventResource
     */
    public EventResource() {
    }

    @POST
    @Secured
    @Path("/student")
    @Produces(MediaType.APPLICATION_JSON)
    public Response studentCreateEvent(Event e, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long creatorId = Long.parseLong(userId);

        try {
            eventSession.studentCreateEvent(creatorId, e.getEventTitle(), e.getEventDate(), e.getEventLocation(),
                    e.getEventDescription(), e.getEventCategory(), e.getDeadline(), e.getEventPrice());
            return Response.ok(Response.Status.CREATED).entity("Event created successfully").build();
        } catch (StudentNotFoundException ex) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }

    @POST
    @Secured
    @Path("/admin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response adminCreateEvent(Event e, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long creatorId = Long.parseLong(userId);

        try {
            eventSession.adminCreateEvent(creatorId, e.getEventTitle(), e.getEventDate(), e.getEventLocation(),
                    e.getEventDescription(), e.getEventCategory(), e.getDeadline(), e.getEventPrice());
            return Response.ok(Response.Status.CREATED).entity("Event created successfully").build();
        } catch (AdminNotFoundException ex) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }

    @GET
    @Secured
    @Path("/{eventId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventById(@PathParam("eventId") Long eventId) {
        try {
            Event event = eventSession.getEventById(eventId);

            if (event.getAdminCreator() != null) {
                Admin a = event.getAdminCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());
            } else {
                Student s = event.getStudentCreator();
                s.setEventsCreated(new ArrayList<>());
                s.setEventsJoined(new ArrayList<>());
                s.setPostsCreated(new ArrayList<>());
                s.setThreadsCreated(new ArrayList<>());
            }

            event.setEventThread(null);
            event.setStudentsJoined(new ArrayList<>());

            return Response.ok(event).build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @PUT
    @Secured
    @Path("/{eventId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editEvent(@PathParam("eventId") Long eventId, Event eventToUpdate) {
        try {
            eventToUpdate.setId(eventId);
            eventSession.editEvent(eventToUpdate);
            return Response.ok("Event updated successfully").build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @DELETE
    @Secured
    @Path("/student/{eventId}")
    public Response studentDeleteEvent(@PathParam("eventId") Long eventId) {
        try {
            eventSession.studentDeleteEvent(eventId);
            return Response.ok("Event deleted successfully").build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @DELETE
    @Secured
    @Path("/admin/{eventId}")
    public Response adminDeleteEvent(@PathParam("eventId") Long eventId) {
        try {
            eventSession.adminDeleteEvent(eventId);
            return Response.ok("Event deleted successfully").build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @GET
    @Secured
    @Path("/registered/{eventId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response viewAllRegistered(@PathParam("eventId") Long eventId) {
        try {
            List<Student> registeredStudents = eventSession.viewAllRegistered(eventId);
            for (Student s : registeredStudents) {
                s.setEventsCreated(new ArrayList<>());
                s.setEventsJoined(new ArrayList<>());
                s.setPostsCreated(new ArrayList<>());
                s.setThreadsCreated(new ArrayList<>());
            }
            return Response.ok(registeredStudents).build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @GET
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEvents(@QueryParam("title") String title,
            @QueryParam("location") String location,
            @QueryParam("category") String category,
            @QueryParam("price") String price) {
        if (title != null) {
            List<Event> events = eventSession.searchEventsByTitle(title);
            for (Event event : events) {
                if (event.getAdminCreator() != null) {
                    Admin a = event.getAdminCreator();
                    a.setEventsCreated(new ArrayList<>());
                    a.setPostsCreated(new ArrayList<>());
                    a.setThreadsCreated(new ArrayList<>());
                } else {
                    Student s = event.getStudentCreator();
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }
                event.setEventThread(null);
                event.setStudentsJoined(new ArrayList<>());

            }

            GenericEntity<List<Event>> entity = new GenericEntity<List<Event>>(events) {
            };
            return Response.status(200).entity(
                    entity
            ).build();
        } else if (location != null) {
            List<Event> events = eventSession.searchEventByLocation(location);
            for (Event event : events) {
                if (event.getAdminCreator() != null) {
                    Admin a = event.getAdminCreator();
                    a.setEventsCreated(new ArrayList<>());
                    a.setPostsCreated(new ArrayList<>());
                    a.setThreadsCreated(new ArrayList<>());
                } else {
                    Student s = event.getStudentCreator();
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }
                event.setEventThread(null);
                event.setStudentsJoined(new ArrayList<>());

            }
            GenericEntity<List<Event>> entity = new GenericEntity<List<Event>>(events) {
            };
            return Response.status(200).entity(
                    entity
            ).build();
        } else if (category != null) {
            List<Event> events = eventSession.searchEventByCategory(category);
            for (Event event : events) {
                if (event.getAdminCreator() != null) {
                    Admin a = event.getAdminCreator();
                    a.setEventsCreated(new ArrayList<>());
                    a.setPostsCreated(new ArrayList<>());
                    a.setThreadsCreated(new ArrayList<>());
                } else {
                    Student s = event.getStudentCreator();
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }

                event.setEventThread(null);
                event.setStudentsJoined(new ArrayList<>());
            }
            GenericEntity<List<Event>> entity = new GenericEntity<List<Event>>(events) {
            };
            return Response.status(200).entity(
                    entity
            ).build();
        } else {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "No query conditions")
                    .build();

            return Response.status(400).entity(exception).build();
        }
    }

    @GET
    @Path("/searchDate")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEventDate(Event e) {

        List<Event> events = eventSession.searchEventByDate(e.getEventDate(), e.getDeadline()); // use this in frontend to say start and end date
        for (Event event : events) {
            if (event.getAdminCreator() != null) {
                Admin a = event.getAdminCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());
            } else {
                Student s = event.getStudentCreator();
                s.setEventsCreated(new ArrayList<>());
                s.setEventsJoined(new ArrayList<>());
                s.setPostsCreated(new ArrayList<>());
                s.setThreadsCreated(new ArrayList<>());
            }

            event.setEventThread(null);
            event.setStudentsJoined(new ArrayList<>());
        }
        GenericEntity<List<Event>> entity = new GenericEntity<List<Event>>(events) {
        };
        return Response.status(200).entity(
                entity
        ).build();
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchAllEvents() {  // cut off event rs
        List<Event> events = eventSession.searchAllEvents();
        for (Event event : events) {
            if (event.getAdminCreator() != null) {
                Admin a = event.getAdminCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());
            } else {
                Student s = event.getStudentCreator();
                s.setEventsCreated(new ArrayList<>());
                s.setEventsJoined(new ArrayList<>());
                s.setPostsCreated(new ArrayList<>());
                s.setThreadsCreated(new ArrayList<>());
            }

            event.setEventThread(null);
            event.setStudentsJoined(new ArrayList<>());
        }
        return Response.ok(events).build();
    }

    private EventSessionLocal lookupEventSessionLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (EventSessionLocal) c.lookup("java:global/ebs/ebs-ejb/EventSession!session.EventSessionLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
