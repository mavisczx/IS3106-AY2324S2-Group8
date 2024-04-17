package session;
import entity.Thread;
import entity.Student;
import java.util.ArrayList;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.ThreadNotFoundException;
import util.exception.StudentNotFoundException;
 
/**
 *
 * @author kaavya
 */

public interface ThreadSessionLocal {
     public void createThread(Long studentId, String title, String desc, ArrayList<String> tags) throws StudentNotFoundException;
      
      public void deleteThread(Long threadId) throws ThreadNotFoundException;

      public void updateThread(Long threadId) throws ThreadNotFoundException;
    
      public void shareThread(Long threadId) throws ThreadNotFoundException;
      
      public Thread retrieveThreadById(Long threadId) throws ThreadNotFoundException;

      public Student retrieveStudentByThread(Long threadId) throws ThreadNotFoundException ;
}
