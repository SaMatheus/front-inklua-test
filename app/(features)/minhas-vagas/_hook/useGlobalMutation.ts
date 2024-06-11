import { MutationOptions, useMutation } from '@tanstack/react-query';
import getApiData from '../_providers/getApiData';
import { useFilterStore } from '../_store/FilterStore';
import { useJobsStore } from '../_store/JobsStore';
import { useMutationStore } from '../_store/MutationStore';
import { usePaginationStore } from '../_store/PaginationStore';
import { MutationDataProps, ParamsProps } from '../_types';

type fnProps= () => void

interface MutationProp {
  params: ParamsProps;
  fn: fnProps[];
  options?: MutationOptions;
}

const useGlobalMutation = ({ params, fn, options }: MutationProp) => {
  const { isMutationInProgress, startMutation, endMutation } = useMutationStore();
  const { setJobs } = useJobsStore();
  const { setFetchData, setLoading } = useFilterStore();
  const { setPagination } = usePaginationStore();


  const mutation = useMutation({
    mutationFn: () => {
      if (isMutationInProgress) return Promise.resolve()
      startMutation();
      return getApiData(params);
    },
    onSuccess: (data) => {
      if (!data) return;

      const mutationData = data as MutationDataProps;

      setFetchData(mutationData.filters);
      setJobs(mutationData.jobs);
      setPagination(mutationData.pagination);
      for (let i = 0; i < fn.length; i++) {
        fn[i]();
      }
      setLoading(false);
      endMutation();
    },
    ...options
  });

  return mutation;
}

export default useGlobalMutation;