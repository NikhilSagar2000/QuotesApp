import { useState,useEffect,useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { sendRequest, status, error, data: allComments } = useHttp(getAllComments, true);

  const { quoteID } = params;
  let htmlComment;

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const loadCommentsOnAdding = useCallback(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);
  
  if (status === 'pending') {
    htmlComment = <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if (error) {
    htmlComment = <div className="centered">{error}</div>
  }

  if (status === 'completed' && allComments && allComments.length > 0) {
    htmlComment = <CommentsList comments={allComments} />
  }

  if (status === 'completed' && (!allComments || allComments.length === 0)) {
    htmlComment = <div className="centered">
      No Comments Yet
    </div>
  }
    
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddingComments={ loadCommentsOnAdding} quoteID={ params.quoteID} />}
      {htmlComment}
    </section>
  );
};

export default Comments;
