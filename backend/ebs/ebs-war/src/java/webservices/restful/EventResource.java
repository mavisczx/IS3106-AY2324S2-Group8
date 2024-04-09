/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Event;
import entity.Student;
import java.util.Date;
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
import session.EventSessionLocal;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;
import util.exception.StudentNotFoundException;

/**
 * REST Web Service
 *
 * @author lt123
 */
@Path("Event")
public class EventResource {

    EventSessionLocal eventSession = lookupEventSessionLocal();

    /**
     * Creates a new instance of EventResource
     */
    public EventResource() {
    }
    @POST
    @Path("/events/student/{creatorId}/{eventTitle}/{eventDate}/{eventLocation}/{eventDescription}/{eventCategory}/{deadline}/{eventPrice}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response studentCreateEvent(@PathParam("creatorId") Long creatorId,
                                       @PathParam("eventTitle") String eventTitle,
                                       @PathParam("eventDate") Date eventDate,
                                       @PathParam("eventLocation") String eventLocation,
                                       @PathParam("eventDescription") String eventDescription,
                                       @PathParam("eventCategory") String eventCategory,
                                       @PathParam("deadline") Date deadline,
                                       @PathParam("eventPrice") String eventPrice) {
        try {
            eventSession.studentCreateEvent(creatorId, eventTitle, eventDate, eventLocation,
                                            eventDescription, eventCategory, deadline, eventPrice);
            return Response.status(Response.Status.CREATED).entity("Event created successfully").build();
        } catch (StudentNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }
    
    @GET
    @Path("/events/admin/{creatorId}/{eventTitle}/{eventDate}/{eventLocation}/{eventDescription}/{eventCategory}/{deadline}/{eventPrice}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response adminCreateEvent(@PathParam("creatorId") Long creatorId,
                                     @PathParam("eventTitle") String eventTitle,
                                     @PathParam("eventDate") Date eventDate,
                                     @PathParam("eventLocation") String eventLocation,
                                     @PathParam("eventDescription") String eventDescription,
                                     @PathParam("eventCategory") String eventCategory,
                                     @PathParam("deadline") Date deadline,
                                     @PathParam("eventPrice") String eventPrice) {
        try {
            eventSession.adminCreateEvent(creatorId, eventTitle, eventDate, eventLocation,
                                          eventDescription, eventCategory, deadline, eventPrice);
            return Response.status(Response.Status.CREATED).entity("Event created successfully").build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }
    
    @GET
    @Path("/events/{eventId}/owner/{studentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response eventOwner(@PathParam("eventId") Long eventId,
                               @PathParam("studentId") Long studentId) {
        try {
            boolean isOwner = eventSession.eventOwner(eventId, studentId);
            return Response.ok(isOwner).build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }
    
    @GET
    @Path("/events/{eventId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventById(@PathParam("eventId") Long eventId) {
        try {
            Event event = eventSession.getEventById(eventId);
            return Response.ok(event).build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }
    
    @PUT
    @Path("/events/edit")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editEvent(Event eventToUpdate) {
        try {
            eventSession.editEvent(eventToUpdate);
            return Response.ok("Event updated successfully").build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }
    
    @DELETE
    @Path("/events/student/{eventId}")
    public Response studentDeleteEvent(@PathParam("eventId") Long eventId) {
        try {
            eventSession.studentDeleteEvent(eventId);
            return Response.ok("Event deleted successfully").build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @DELETE
    @Path("/events/admin/{eventId}")
    public Response adminDeleteEvent(@PathParam("eventId") Long eventId) {
        try {
            eventSession.adminDeleteEvent(eventId);
            return Response.ok("Event deleted successfully").build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }
    
    @GET
    @Path("/events/{eventId}/registered")
    @Produces(MediaType.APPLICATION_JSON)
    public Response viewAllRegistered(@PathParam("eventId") Long eventId) {
        try {
            List<Student> registeredStudents = eventSession.viewAllRegistered(eventId);
            return Response.ok(registeredStudents).build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }
    
    @GET
    @Path("/events/search/title/{title}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEventsByTitle(@PathParam("title") String title) {
        List<Event> events = eventSession.searchEventsByTitle(title);
        return Response.ok(events).build();
    }
    
    @GET
    @Path("/events/search/date/{eventDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEventByDate(@PathParam("eventDate") Date eventDate) {
        List<Event> events = eventSession.searchEventByDate(eventDate);
        return Response.ok(events).build();
    }

    @GET
    @Path("/events/search/deadline/{deadline}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEventByDeadline(@PathParam("deadline") Date deadline) {
        List<Event> events = eventSession.searchEventByDeadline(deadline);
        return Response.ok(events).build();
    }    
    
    @GET
    @Path("/events/search/location/{location}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEventByLocation(@PathParam("location") String location) {
        List<Event> events = eventSession.searchEventByLocation(location);
        return Response.ok(events).build();
    }
    
    @GET
    @Path("/events/search/category/{category}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEventByCategory(@PathParam("category") String category) {
        List<Event> events = eventSession.searchEventByCategory(category);
        return Response.ok(events).build();
    }

    @GET
    @Path("/events/search/price/{price}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchEventByPrice(@PathParam("price") String price) {
        List<Event> events = eventSession.searchEventByPrice(price);
        return Response.ok(events).build();
    } 
    
    @GET
    @Path("/events/search/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchAllEvents() {
        List<Event> events = eventSession.searchAllEvents();
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
