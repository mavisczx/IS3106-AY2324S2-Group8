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
import session.ThreadSessionLocal;
import util.exception.AdminExistsException;
import util.exception.AdminNotFoundException;
import util.exception.EventNotFoundException;
import util.exception.PostNotFoundException;
import util.exception.StudentNotFoundException;

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
    public Response createPost(Thread thread, Long StudentId) throws StudentNotFoundException {

       threadSession.createThread( StudentId ,thread.getTitle(), thread.getDescription(), thread.getTags());
       return Response.ok().build();
    }


    
    @GET
    @Secured
    @Path("/post")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getThreads(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Long aId = Long.parseLong(userId);

        List<Thread> threadList = threadSession.getAllThreads();
        return Response.ok(threadList).build();
    }


}

