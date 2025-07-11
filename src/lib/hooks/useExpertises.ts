import {useQuery} from "@tanstack/react-query";

export const useExpertisesList = () => {
    return useQuery({
        queryKey: ["expertisesShort"],
        queryFn: async () => {
            const res = await fetch(`/api/expertises/short`)
            return await res.json()
        },
    })
}

export const useExpertisesById = async (id: string) => {
    return useQuery({
        queryKey: ["expertise", id],
        queryFn: async () => {
            const res = await fetch(`/api/expertise/${id}`)
            return await res.json()
        },
    })
}

export const useExpertisesAll = () => {
    return useQuery({
        queryKey: ["allExpertises"],
        queryFn: async () => {
            const res = await fetch('/api/expertises/all')
            return await res.json()
        }
    })
}
