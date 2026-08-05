// 1. Install:
//    npm install @tanstack/react-query
//
// 2. Wrap your app root with this ONCE (e.g. in main.jsx / App.jsx),
//    not inside AdminMailboxPage itself.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,        // data is "fresh" for 30s — no refetch on remount within that window
      refetchOnWindowFocus: false, // set true if you want it to auto-refresh when the tab regains focus
      retry: 1,
    },
  },
})

// Example usage in main.jsx:
//
// import { queryClient } from './queryClient-setup'
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>
// )