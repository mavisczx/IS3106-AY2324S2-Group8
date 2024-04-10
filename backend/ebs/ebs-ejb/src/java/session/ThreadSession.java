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

@Stateless
public class ThreadSession implements ThreadSessionLocal {
    @PersistenceContext
    private EntityManager em;
        
    @Override
    public void createThread(String title, String desc, ArrayList<String> tags) {
      Thread postToCreate = new Thread(title, desc, tags);
      em.persist(postToCreate);
    }
    
    @Override
    public void deleteThread(Long threadId) throws ThreadNotFoundException{
       Thread thread = retrieveThreadById(threadId);
       em.remove(thread);
    }
    
    @Override
    public void updateThread(Long threadId) throws ThreadNotFoundException {
       Thread thread = retrieveThreadById(threadId);
       //update parameters
       em.persist(thread);
    }
    
    @Override
    public void shareThread(Long threadId) throws ThreadNotFoundException {
        Thread thread = retrieveThreadById(threadId);
        int shareCount = thread.getShareCount();
        shareCount++;
        thread.setShareCount(shareCount);
        // figure out how to acutally send the 'msg'
    }
    
    @Override
    public Thread retrieveThreadById(Long threadId) throws ThreadNotFoundException {
      Thread thread = em.find(Thread.class, threadId);
      if (thread != null) {
        return thread;
      } else {
           throw new ThreadNotFoundException("Error: Post does not Exist!");
      }
    }
    
    @Override
    public Student retrieveStudentByThread(Long threadId) throws ThreadNotFoundException {
      Thread thread = retrieveThreadById(threadId);
      Student creatorStudent = thread.getThreadCreator();
      return creatorStudent;
    }

    
}
