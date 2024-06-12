// importe todos os useStores desta pasta aqui e exporte eles num objeto

import useFilterStore from './FilterStore';
import useJobsStore from './JobsStore';
import useMobileStore from './MobileStore';
import useMutationStore from './MutationStore';
import usePaginationStore from './PaginationStore';

export {
  useFilterStore,
  useMobileStore,
  useMutationStore,
  useJobsStore,
  usePaginationStore
}