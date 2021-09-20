import { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm';
import { useHistory } from "react-router-dom";
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const AddQuote = () => {
    const { sendRequest, status, error} = useHttp(addQuote);
    const history = useHistory();

    useEffect(() => {
        if (status === 'completed' && !error) {
            history.push('/quotes');
        }
    }, [history, status, error])
    
    const addQuoteHandler =(newQuote)=> {
        sendRequest(newQuote);
    }   

    if (status === 'pending') {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }
    return <QuoteForm onAddQuote={addQuoteHandler}/>
}

export default AddQuote
