import React, {lazy} from 'react';
import { FormattedMessage } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'

const SummaryPromise = import ('./pages/summary/summary');
const Summary = lazy(()=> SummaryPromise);

function App() {

  const queryClient = new QueryClient()

  return (
    <React.Suspense fallback={<div>Loading suspense...</div>}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <main className="mt-5">
            <h1 className="font-mono tracking-widest text-4xl font-extrabold text-pink-500">
              <FormattedMessage 
                id='app.header'
                defaultMessage='All your Covid-19 information here' />  
            </h1>
              <Switch>
              <Route path="/">
                <Summary />
              </Route>
              <Route path="/Romania">
                <Summary />
              </Route>
            </Switch>
          </main>
        </QueryClientProvider>
        {/* <ReactQueryDevtools initialIsOpen={false}/> */}
      </Router>
    </React.Suspense>
  );
}

export default App;
