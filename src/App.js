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

const RomaniaPromise = import ('./pages/romania/romania');
const Romania = lazy(()=> RomaniaPromise);

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
            <div className="w-9/12 mt-5 pb-3 mx-auto shadow-pink rounded-md">
              <Switch>
                <Route path="/Romania">
                  <Romania />
                  </Route>
                <Route path="/">
                  <Summary />
                </Route>
              </Switch>
            </div>
          </main>
        </QueryClientProvider>
        {/* <ReactQueryDevtools initialIsOpen={false}/> */}
      </Router>
    </React.Suspense>
  );
}

export default App;
