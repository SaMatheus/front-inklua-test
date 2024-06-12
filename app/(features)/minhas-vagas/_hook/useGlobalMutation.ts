import { MutationOptions, useMutation } from '@tanstack/react-query';
import getApiData from '../_providers/getApiData';
import { useFilterStore, useJobsStore, useMutationStore, usePaginationStore } from '../_store';
import { MutationDataProps, ParamsProps } from '../_types';

type fnProps= () => void

interface GlobalMutationProp {
  params: ParamsProps;
  fn: fnProps[];
  options?: MutationOptions;
}

const useGlobalMutation = ({ params, fn, options }: GlobalMutationProp) => {
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
    onError: (error) => {
      console.log('Erro', error)
      setLoading(false);
      endMutation();
    },
    ...options
  });

  return mutation;
}

export default useGlobalMutation;