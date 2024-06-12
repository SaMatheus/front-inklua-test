/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react';
import { useFilterStore, useJobsStore, usePaginationStore } from 'app/(features)/minhas-vagas/_store';
import { JobsProps } from 'app/(features)/minhas-vagas/_types';
import JobBox from './JobBox';
import JobsNotFound from './JobsNotFound';

const JobList = () => {
  const { jobs, jobRectTop, setJobRectTop } = useJobsStore();
  const { reFetch, setReFetch } = useFilterStore();
  const { pagination } = usePaginationStore();

  useEffect(() => {
    if (reFetch && jobRectTop && typeof window !== 'undefined') {
      window.scrollTo({ top: jobRectTop, behavior: 'smooth' })
    }
    setJobRectTop(0);
    setReFetch(false);
  }, [])

  return jobs?.length > 0
    ? jobs?.slice(0, pagination.jobsByPage)?.map((job: JobsProps, index) => <JobBox key={index} data={job} />)
    : <JobsNotFound />
}

export default JobList;