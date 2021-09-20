import { Fragment,useEffect } from 'react';
import { useParams, Link, Route, useRouteMatch } from 'react-router-dom';
import HighligtedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetails = () => {
  const params = useParams();
  const routeMatch = useRouteMatch();
  const { sendRequest, status, error , data: highligtedQuote } = useHttp(getSingleQuote,true);
  
  useEffect(() => {
    sendRequest(params.quoteID)
  },[sendRequest,params.quoteID])

  if (status === 'pending') {
   return  <div className="centered">
        <LoadingSpinner />
      </div>
  }
  if (error) {
    return <div className="centered">
      <h3>{error}</h3>
    </div>
  }
  
  if (!highligtedQuote.text) {
        return <h1>No Quote Found</h1>
  }

    return (
      <Fragment>
        <HighligtedQuote
          text={highligtedQuote.text}
          author={highligtedQuote.author}
        />
        <Route path={routeMatch.path} exact>
          <div className="centered">
            <Link className="btn--flat" to={`${routeMatch.url}/comments`}>
              Load Comments
            </Link>
          </div>
        </Route>
        <Route path={`${routeMatch.path}/comments`}>
          <Comments />
        </Route>
      </Fragment>
    ); 
}
export default QuoteDetails;