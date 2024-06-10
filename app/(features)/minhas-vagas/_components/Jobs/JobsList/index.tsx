import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore';
import JobBox from './JobBox';
import { JobsProps } from 'app/(features)/minhas-vagas/_types';
import { PaginationStore } from 'app/(features)/minhas-vagas/_store/PaginationStore';

const JobList = () => {
  const { jobs } = useJobsStore();
  const { pagination } = PaginationStore();

  return jobs && jobs?.slice(pagination.pages)?.map((job: JobsProps) => <JobBox data={job} />)
}

export default JobList;