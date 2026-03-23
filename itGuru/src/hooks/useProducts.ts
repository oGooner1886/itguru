import { useState, useCallback, useEffect, useRef } from "react";
import { api } from "../api";
import type { Product, SortConfig, ProductsResponse } from "../types";
import toast from "react-hot-toast";

const LIMIT = 20;

export const useProducts = (
  page: number,
  search: string,
  sortConfig: SortConfig,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;
      const baseUrl = search.trim() ? "/products/search" : "/products";

      const params = new URLSearchParams({
        limit: LIMIT.toString(),
        skip: skip.toString(),
      });

      if (search.trim()) params.append("q", search);

      if (sortConfig.key && sortConfig.order) {
        params.append("sortBy", String(sortConfig.key));
        params.append("order", sortConfig.order);
      }

      const res = await api.get<ProductsResponse>(
        `${baseUrl}?${params.toString()}`,
      );
      setProducts(res.data.products);
      setTotal(res.data.total);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Ошибка при получении данных");
    } finally {
      setLoading(false);
    }
  }, [page, search, sortConfig]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      fetchItems();
    }, 400);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [fetchItems]);

  const refresh = useCallback(async () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    await fetchItems();
  }, [fetchItems]);

  return { products, total, loading, refetch: refresh };
};
