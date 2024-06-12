import { create } from 'zustand';
import { JobsProps } from '../_types';

interface JobsStoreProps {
  jobs: JobsProps[];
  setJobs: (jobs: JobsProps[]) => void;
  jobRectTop: number | null,
  setJobRectTop: (rect: number | null) => void;
}

const useJobsStore = create<JobsStoreProps>((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  jobRectTop: null,
  setJobRectTop: (rect) => set({ jobRectTop: rect })
}));

export default useJobsStore;
