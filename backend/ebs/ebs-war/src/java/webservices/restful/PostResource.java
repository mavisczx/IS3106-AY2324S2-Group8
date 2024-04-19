/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Admin;
import entity.Post;
import entity.Student;
import entity.Thread;
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
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import session.StudentSessionLocal;
import session.PostSessionLocal;
import util.exception.PostNotFoundException;

/**
 *
 * @author kaavya
 */
@Path("post")
public class PostResource {

    @EJB
    private StudentSessionLocal studentSessionLocal;

    PostSessionLocal postSession = lookupPostSessionLocal();

    /**
     * Creates a new instance of AdminResource
     */
    public PostResource() {
    }

    private PostSessionLocal lookupPostSessionLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (PostSessionLocal) c.lookup("java:global/ebs/ebs-ejb/PostSession!session.PostSessionLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    @POST
    @Path("{threadId}")
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response studentCreatePost(@PathParam("threadId") Long threadId, Post post, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long studentId = Long.parseLong(userId);

        try {
            postSession.studentCreatePost(studentId, threadId, post.getPostDescription());
            return Response.ok().build();
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/admin/{threadId}")
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response adminCreatePost(@PathParam("threadId") Long threadId, Post post, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long adminId = Long.parseLong(userId);

        try {
            postSession.adminCreatePost(adminId, threadId, post.getPostDescription());
            return Response.ok().build();
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Secured
    @Path("/student/{postId}")
    public Response studentDeletePost(@PathParam("postId") Long postId, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long studentId = Long.parseLong(userId);
        try {
            postSession.studentDeletePost(postId, studentId);
            return Response.ok("Event deleted successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @DELETE
    @Secured
    @Path("/admin/{postId}")
    public Response adminDeletePost(@PathParam("postId") Long postId, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long adminId = Long.parseLong(userId);
        try {
            postSession.adminDeletePost(postId, adminId);
            return Response.ok("Event deleted successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
    }

    @GET
    @Secured
    @Path("/allPosts")
    public List<Post> getPosts() {
        List<Post> postList = postSession.getAllPost();
        for (Post p : postList) {
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
        return postList;
    }

    @GET
    @Secured
    @Path("/creatorName/{postId}")
    public String getPostCreatorName(@PathParam("postId") Long postId) {
        try {
            Post p = postSession.retrievePostById(postId);
            if (p.getAdminPostCreator() != null) {
                return p.getAdminPostCreator().getUsername();
            } else {
                return p.getStudentPostCreator().getUsername();
            }
        } catch (PostNotFoundException ex) {
            return "error";
        }
    }

}
