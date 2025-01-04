import useSWR from 'swr';
import { getAllQuestionsFromFirestore } from '@/utils/question-helper';

export function useAllQuestions(sessionId: string) {
  const { data, error } = useSWR(sessionId ? `session-${sessionId}` : null, () => getAllQuestionsFromFirestore(sessionId));

  return {
    session: data,
    isLoading: !error && !data,
    isError: error,
  };
}

// export function useCollectionsByDepartment(selectedDepartment) {
//   const { data, error } = useSWR(
//       selectedDepartment ? ["allCollections", selectedDepartment.id] : null,
//       () => fetchCollectionsByDepartment(selectedDepartment.id)
//   );

//   return {
//       collections: data,
//       isLoading: !error && !data,
//       isError: error
//   };
// }