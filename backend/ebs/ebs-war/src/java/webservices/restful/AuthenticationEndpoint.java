package webservices.restful;

import entity.Admin;
import entity.Credentials;
import entity.Student;
import io.jsonwebtoken.Jwts;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.AdminSessionLocal;
import session.StudentSessionLocal;

@Path("/authentication")
public class AuthenticationEndpoint {

    @EJB
    private StudentSessionLocal studentSessionLocal;

    @EJB
    private AdminSessionLocal adminSessionLocal;

    // 1 day token expiry 
    final int TOKEN_EXPIRY = 24;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateStudent(Credentials credentials) {
        JsonObject LOGIN_FAILED_ERROR = Json.createObjectBuilder()
                .add("error", "Login Failed")
                .build();

        String email = credentials.getEmail();
        String password = credentials.getPassword();

        try {
            //TODO: perform authentication
            Student student = studentSessionLocal.login(email, password);

            Long userId = student.getId();
            Date now = new Date();

            Calendar cal = Calendar.getInstance();
            cal.setTime(now);
            cal.add(Calendar.HOUR, TOKEN_EXPIRY);

            String jwtToken = Jwts.builder()
                    .claim("userId", "" + userId) //store the userId as a String
                    .setId(UUID.randomUUID().toString())
                    .setIssuedAt(now)
                    .setExpiration(cal.getTime())
                    .signWith(JWTHelper.hmacKey)
                    .compact();

            System.out.println("#jwtToken: " + jwtToken);
            JsonObject token = Json.createObjectBuilder()
                    .add("token", jwtToken)
                    .build();
            return Response.status(Response.Status.OK).entity(token).build();

        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(LOGIN_FAILED_ERROR).build();
        }
    }

    @POST
    @Path("admin")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateAdmin(Credentials credentials) {
        JsonObject LOGIN_FAILED_ERROR = Json.createObjectBuilder()
                .add("error", "Login Failed")
                .build();

        String email = credentials.getEmail();
        String password = credentials.getPassword();

        try {
            //TODO: perform authentication
            Admin admin = adminSessionLocal.login(email, password);

            Long userId = admin.getId();
            Date now = new Date();

            Calendar cal = Calendar.getInstance();
            cal.setTime(now);
            cal.add(Calendar.HOUR, TOKEN_EXPIRY);

            String jwtToken = Jwts.builder()
                    .claim("userId", "" + userId) //store the userId as a String
                    .setId(UUID.randomUUID().toString())
                    .setIssuedAt(now)
                    .setExpiration(cal.getTime())
                    .signWith(JWTHelper.hmacKey)
                    .compact();

            System.out.println("#jwtToken: " + jwtToken);
            JsonObject token = Json.createObjectBuilder()
                    .add("token", jwtToken)
                    .build();
            return Response.status(Response.Status.OK).entity(token).build();

        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(LOGIN_FAILED_ERROR).build();
        }
    }
}
