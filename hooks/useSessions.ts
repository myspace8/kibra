import useSWR from 'swr';
import { getAllSessions } from '@/utils/functions';

export function useAllSessions() {
  const { data, error } = useSWR('sessions', getAllSessions);

  return {
    sessions: data,
    isLoading: !error && !data,
    isError: error,
  };
}
