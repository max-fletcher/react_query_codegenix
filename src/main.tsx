import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// NOTE: importing react-query related stuff
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  // NOTE: we can set default options for react-query here
  defaultOptions: {
    queries: { 
      retry: 5, // Number of retries. By default, it is 3.
      retryDelay: 1000 // Delay before retry attempt. By default, it is 0.
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* NOTE: Wrapping the App inside the QueryClientProvider  */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* NOTE: Including this here to use "ReactQueryDevtools" with setting "initialIsOpen" to false so it doesn't open every time we open the browser */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
