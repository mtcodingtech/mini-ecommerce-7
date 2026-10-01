import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get("https://dummyjson.com/products/categories");
            return response.data;
        }
    })
} 