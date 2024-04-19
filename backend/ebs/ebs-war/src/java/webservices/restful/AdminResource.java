/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Admin;
import entity.Event;
import entity.Post;
import entity.Student;
import entity.Thread;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import session.AdminSessionLocal;
import session.EventSessionLocal;
import util.exception.AdminExistsException;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;

/**
 * REST Web Service
 *
 * @author lt123
 */
@Path("admin")
public class AdminResource {

    @EJB
    private EventSessionLocal eventSessionLocal;

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
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAdmin(Admin a) {

        try {
            adminSession.createAdmin(a.getUsername(), a.getName(), a.getEmail(), a.getContact(), a.getPassword());
            return Response.ok().build();
        } catch (AdminExistsException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin creation failed").build();
        }
    }

    @GET
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAdminById(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long aId = Long.parseLong(userId);
        try {
            Admin admin = adminSession.retrieveAdminById(aId);

            admin.setEventsCreated(new ArrayList<>());
            admin.setPostsCreated(new ArrayList<>());
            admin.setThreadsCreated(new ArrayList<>());

            return Response.ok(admin).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin creation failed").build();
        }
    }

    @PUT
    @Secured
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateAdmin(Admin admin, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long aId = Long.parseLong(userId);

        try {
            admin.setId(aId);
            adminSession.updateAdminProfile(admin);
            return Response.ok().build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }

    @PUT
    @Secured
    @Path("/passwordChange")
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(Admin a, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long aId = Long.parseLong(userId);

        try {
            adminSession.changePassword(aId, a.getPassword());
            return Response.ok().build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }

    @GET
    @Secured
    @Path("/createdEvents")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCreatedEvents(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long aId = Long.parseLong(userId);

        try {
            List<Event> eventList = adminSession.listAllEventsCreated(aId);
            for (Event e : eventList) {
                Admin a = e.getAdminCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());

                List<Student> studentsJoined = e.getStudentsJoined();
                for (Student s : studentsJoined) {
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }

                Thread thread = e.getEventThread();
                if (thread != null) {
                    thread.setEventCreated(null);
                    thread.setPostsInThread(new ArrayList<>());
                    thread.setStudentThreadCreator(null);
                }
            }

            return Response.ok(eventList).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found").build();
        }
    }

    @GET
    @Secured
    @Path("/checkEventOwner/{eventId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response isAdminEventOwner(@PathParam("eventId") Long eventId, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long adminId = Long.parseLong(userId);

        try {
            boolean isOwner = eventSessionLocal.isAdminEventOwner(eventId, adminId);
            return Response.ok(isOwner).build();
        } catch (EventNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @GET
    @Secured
    @Path("/postsCreated")
    @Produces(MediaType.APPLICATION_JSON)
    public Response viewAllPostsCreated(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long adminId = Long.parseLong(userId);

        try {
            Admin admin = adminSession.retrieveAdminById(adminId);
            List<Post> posts = admin.getPostsCreated();
            for (Post p : posts) {
                entity.Thread t = p.getPostThread();
                t.setAdminThreadCreator(null);
                t.setStudentThreadCreator(null);
                t.setPostsInThread(new ArrayList<>());
                t.setEventCreated(null);

                Admin a = p.getAdminPostCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());

            }
            GenericEntity<List<Post>> entity = new GenericEntity<List<Post>>(posts) {
            };
            return Response.status(200).entity(entity).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }

    @GET
    @Secured
    @Path("/threadsCreated")
    @Produces(MediaType.APPLICATION_JSON)
    public Response viewAllThreadsCreated(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long adminId = Long.parseLong(userId);

        try {
            Admin admin = adminSession.retrieveAdminById(adminId);
            List<Thread> threads = admin.getThreadsCreated();
            for (Thread t : threads) {
                if (t.getEventCreated() != null) {
                    Event e = t.getEventCreated();

                    Admin a = e.getAdminCreator();
                    a.setEventsCreated(new ArrayList<>());
                    a.setPostsCreated(new ArrayList<>());
                    a.setThreadsCreated(new ArrayList<>());

                    e.setEventThread(null);
                    e.setStudentsJoined(new ArrayList<>());
                }

                Admin a = t.getAdminThreadCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());

                t.setPostsInThread(new ArrayList<>());
            }

            GenericEntity<List<Thread>> entity = new GenericEntity<List<Thread>>(threads) {
            };
            return Response.status(200).entity(entity).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Student not found").build();
        }
    }
}
