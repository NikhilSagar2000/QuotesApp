import { useRef,useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest, status, error} = useHttp(addComment);

  const { quoteID,onAddingComments } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddingComments();
    }
  }, [status, error, onAddingComments]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    sendRequest({
      commentData: {
      text: commentTextRef.current.value
      },
      quoteID: quoteID
  });    
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
    {status === 'pending' && <LoadingSpinner />}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
