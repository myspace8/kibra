import useSWR from 'swr';
import { getSessionsByUid } from '@/utils/functions';

export function useSessionByUid(uid: string) {
  const { data, error } = useSWR(uid ? `session-${uid}` : null, () => getSessionsByUid(uid));

  return {
    session: data,
    isLoading: !error && !data,
    isError: error,
  };
}