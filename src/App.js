import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
import QuoteDetails from './pages/QuoteDetails';
import AddQuote from './pages/AddQuote';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quoteID" >
          <QuoteDetails />
        </Route>
        <Route path="/add-quote" exact>
          <AddQuote />
        </Route>
        <Route path="*" exact>
          <PageNotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;