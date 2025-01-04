import { getAllCollections, fetchCollectionsByDepartment } from "@/utils/functions";
import useSWR from "swr";

export function useAllCollections() {
    const { data, error } = useSWR("allCollections", getAllCollections)

    return {
        collections: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function useCollectionsByDepartment(selectedDepartment) {
    const { data, error } = useSWR(
        selectedDepartment ? ["allCollections", selectedDepartment.id] : null,
        () => fetchCollectionsByDepartment(selectedDepartment.id)
    );

    return {
        collections: data,
        isLoading: !error && !data,
        isError: error
    };
}