import React from 'react';
import Summary from './charts/summary';
import { FormattedMessage } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <main className="mt-5">
        <h1 className="font-mono tracking-widest text-4xl font-extrabold dark:text-pink-500">
          <FormattedMessage 
            id='app.header'
            defaultMessage='All your Covid-19 information here' />  
        </h1>
        <QueryClientProvider client={queryClient}>
          <Summary/>
        </QueryClientProvider>
      </main>
      {/* <ReactQueryDevtools initialIsOpen={false}/> */}
    </>
  );
}

export default App;
