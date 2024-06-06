'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyJobs from './_components/MyJobs/index'

const MyJobsPage = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <MyJobs />
    </QueryClientProvider>
)
}

export default MyJobsPage