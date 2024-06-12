'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchJobs from './_components/SearchJobs';

const SearchJobsPage = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <SearchJobs />
    </QueryClientProvider>
)
}

export default SearchJobsPage