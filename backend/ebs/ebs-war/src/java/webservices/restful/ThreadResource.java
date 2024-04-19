/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Admin;
import entity.Event;
import entity.Post;
import java.lang.Long;
import entity.Thread;
import entity.Student;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import session.StudentSessionLocal;
import session.ThreadSessionLocal;
import util.exception.AdminNotFoundException;
import util.exception.StudentNotFoundException;
import util.exception.ThreadNotFoundException;

/**
 *
 * @author kaavya
 */
@Path("thread")
public class ThreadResource {

    @EJB
    private StudentSessionLocal studentSessionLocal;

    ThreadSessionLocal threadSession = lookupThreadSessionLocal();

    /**
     * Creates a new instance of AdminResource
     */
    public ThreadResource() {
    }

    private ThreadSessionLocal lookupThreadSessionLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (ThreadSessionLocal) c.lookup("java:global/ebs/ebs-ejb/ThreadSession!session.ThreadSessionLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    @POST
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public Response studentCreateThread(Thread thread, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long studentId = Long.parseLong(userId);

        try {
            threadSession.studentCreateThread(studentId, thread.getTitle(), thread.getDescription(), thread.getTag());
            return Response.ok().build();
        } catch (StudentNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/admin")
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public Response adminCreateThread(Thread thread, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long adminId = Long.parseLong(userId);

        try {
            threadSession.adminCreateThread(adminId, thread.getTitle(), thread.getDescription(), thread.getTag());
            return Response.ok().build();
        } catch (AdminNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Secured
    @Path("/student/{threadId}")
    public Response studentDeleteThread(@PathParam("threadId") Long threadId, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long studentId = Long.parseLong(userId);
        try {
            threadSession.studentDeleteThread(threadId, studentId);
            return Response.ok("Event deleted successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @DELETE
    @Secured
    @Path("/admin/{threadId}")
    public Response adminDeleteThread(@PathParam("threadId") Long threadId, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long adminId = Long.parseLong(userId);
        try {
            threadSession.adminDeleteThread(threadId, adminId);
            return Response.ok("Event deleted successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @GET
    @Path("{threadId}")
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public Thread getThreadById(@PathParam("threadId") Long threadId, @Context SecurityContext securityContext) {
        try {
            Thread t = threadSession.retrieveThreadById(threadId);

            if (t.getEventCreated() != null) {
                Event e = t.getEventCreated();
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

            if (t.getAdminThreadCreator() != null) {
                Admin a = t.getAdminThreadCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());
            } else {
                Student s = t.getStudentThreadCreator();
                s.setEventsCreated(new ArrayList<>());
                s.setEventsJoined(new ArrayList<>());
                s.setPostsCreated(new ArrayList<>());
                s.setThreadsCreated(new ArrayList<>());
            }

            t.setPostsInThread(new ArrayList<>());

            return t;
        } catch (Exception e) {
            return null;
        }
    }

    @GET
    @Secured
    @Path("/allThreads")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Thread> getThreads(@Context SecurityContext securityContext) {
        List<Thread> threadList = threadSession.getAllThreads();
        for (Thread t : threadList) {
            if (t.getEventCreated() != null) {
                Event e = t.getEventCreated();
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

            if (t.getAdminThreadCreator() != null) {
                Admin a = t.getAdminThreadCreator();
                a.setEventsCreated(new ArrayList<>());
                a.setPostsCreated(new ArrayList<>());
                a.setThreadsCreated(new ArrayList<>());
            } else {
                Student s = t.getStudentThreadCreator();
                s.setEventsCreated(new ArrayList<>());
                s.setEventsJoined(new ArrayList<>());
                s.setPostsCreated(new ArrayList<>());
                s.setThreadsCreated(new ArrayList<>());
            }

            t.setPostsInThread(new ArrayList<>());
        }
        return threadList;
    }

    @GET
    @Secured
    @Path("/postsInThread/{threadId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPostsInThreads(@PathParam("threadId") Long threadId) {
        try {
            List<Post> posts = threadSession.getPostInThreads(threadId);
            for (Post p : posts) {
                Thread t = p.getPostThread();
                t.setAdminThreadCreator(null);
                t.setStudentThreadCreator(null);
                t.setPostsInThread(new ArrayList<>());
                t.setEventCreated(null);
                if (p.getAdminPostCreator() != null) {
                    Admin a = p.getAdminPostCreator();
                    a.setEventsCreated(new ArrayList<>());
                    a.setPostsCreated(new ArrayList<>());
                    a.setThreadsCreated(new ArrayList<>());
                } else {
                    Student s = p.getStudentPostCreator();
                    s.setEventsCreated(new ArrayList<>());
                    s.setEventsJoined(new ArrayList<>());
                    s.setPostsCreated(new ArrayList<>());
                    s.setThreadsCreated(new ArrayList<>());
                }
            }

            GenericEntity<List<Post>> entity = new GenericEntity<List<Post>>(posts) {
            };
            return Response.status(200).entity(entity).build();
        } catch (ThreadNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Secured
    @Path("/creatorName/{threadId}")
    public String getThreadCreatorName(@PathParam("threadId") Long threadId) {
        try {
            Thread t = threadSession.retrieveThreadById(threadId);
            if (t.getAdminThreadCreator() != null) {
                return t.getAdminThreadCreator().getUsername();
            } else {
                return t.getStudentThreadCreator().getUsername();
            }
        } catch (ThreadNotFoundException ex) {
            return "error";
        }
    }
}
