import useSWR from 'swr';
import { getQuestionsBySessionId } from '@/utils/functions';

export function useQuestionsBySessionId(sessionId: string) {
  const { data, error } = useSWR(sessionId ? `session-${sessionId}` : null, () => getQuestionsBySessionId(sessionId));

  return {
    question: data,
    isLoading: !error && !data,
    isError: error,
  };
}