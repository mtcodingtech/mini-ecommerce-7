import { useCategoryStore } from "@/store/useCategoryStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProductsByCategory = () => {
  const { selectedCategory } = useCategoryStore();
  return useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${selectedCategory}`,
      );
      return response.data;
    },
  });
};
