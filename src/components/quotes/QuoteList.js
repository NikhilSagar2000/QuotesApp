import { Fragment } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  
  let sortedQuotes;
  const currentURLParams = new URLSearchParams(location.search);

  const isAscending = currentURLParams.get('sort') === 'asc' ;

  if (isAscending) {
    sortedQuotes = props.quotes.sort((a, b) => {
      return a > b ? 1 : -1;
    });
  } else {
    sortedQuotes = props.quotes.sort((a, b) => {
      return a > b ? 1 : -1;
    });
  }

  const sortHandler = () => {
    history.push('/quotes?sort=' + (isAscending ? 'desc' : 'asc'));
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandler}>{`Sort ${isAscending ? 'Descending' : 'Ascending'}`}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
