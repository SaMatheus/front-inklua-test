import { create } from 'zustand';

interface JobsProps {
  id: number;
  uri: string;
  title: string;
  salary: string;
  location: string;
  company: string;
  workModel: [string];
  publishedAt: string;
  description: string;
}

interface JobsStore {
  jobs: JobsProps[];
  setJobs: (jobs: JobsProps[]) => void;
}


export const useJobsStore = create<JobsStore>((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs })
}));
