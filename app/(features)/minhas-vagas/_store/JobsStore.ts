import { create } from 'zustand';
import { JobsProps } from '../_types';
import { RefObject } from 'react';

interface JobsStore {
  jobs: JobsProps[];
  setJobs: (jobs: JobsProps[]) => void;
  jobRectTop: number | null,
  setJobRectTop: (rect: number | null) => void;
}

export const useJobsStore = create<JobsStore>((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  jobRectTop: null,
  setJobRectTop: (rect) => set({ jobRectTop: rect })
}));
