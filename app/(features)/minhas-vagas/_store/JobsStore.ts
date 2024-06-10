import { create } from 'zustand';
import { JobsProps } from '../_types';

interface JobsStore {
  jobs: JobsProps[];
  setJobs: (jobs: JobsProps[]) => void;
}

export const useJobsStore = create<JobsStore>((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs })
}));
