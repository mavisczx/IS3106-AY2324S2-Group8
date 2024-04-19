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
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import session.StudentSessionLocal;
import session.PostSessionLocal;
import util.exception.AdminExistsException;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;

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
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public Response createPost(Post post, Long StudentId) throws StudentNotFoundException {

        postSession.createPost(StudentId, post.getPostDescription(), post.getTags(), post.getImageURL());
        return Response.ok().build();
    }


    
    @GET
    @Secured
    @Path("/post")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPosts(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long aId = Long.parseLong(userId);

        List<Post> postList = postSession.getAllPost();
        return Response.ok(postList).build();
    }


}

