import React from 'react';
import Summary from './charts/summary';
import { FormattedMessage } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  const queryClient = new QueryClient()

  return (
    <main className="my-auto">
      <h1 className="font-mono tracking-widest dark:text-pink-500">
        <FormattedMessage 
          id='app.header'
          defaultMessage='All your Covid-19 information here' />  
      </h1>
      <QueryClientProvider client={queryClient}>
        <Summary/>
      </QueryClientProvider>
    </main>
  );
}

export default App;
