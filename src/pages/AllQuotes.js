import { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuoteFound from '../components/quotes/NoQuotesFound';

const AllQuotes = () => {
    const { sendRequest, status, error, data: allQuotesData } = useHttp(getAllQuotes,true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }
    if (error) {
        return <div className="centered">
            <h1>{error}</h1>
        </div>
    }

    if (status === 'completed' && (!allQuotesData || allQuotesData.length === 0)){
        return <div className="centered">
            <NoQuoteFound />
        </div>
    }



    return <QuoteList quotes={allQuotesData} />
}

export default AllQuotes;