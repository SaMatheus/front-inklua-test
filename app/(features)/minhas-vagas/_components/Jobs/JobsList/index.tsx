'use client'
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore';
import JobBox from './JobBox';
import { JobsProps } from 'app/(features)/minhas-vagas/_types';
import { PaginationStore } from 'app/(features)/minhas-vagas/_store/PaginationStore';

const JobList = () => {
  const { jobs } = useJobsStore();
  const { pagination } = PaginationStore();

  return jobs && jobs?.slice(0, pagination.jobsByPage)?.map((job: JobsProps, index) => <JobBox key={index} data={job} />)
}

export default JobList;