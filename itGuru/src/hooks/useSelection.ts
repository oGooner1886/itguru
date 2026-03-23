import { useState, useMemo, useCallback } from "react";
import type { Product } from "../types";

export const useSelection = (products: Product[], total: number) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isGlobalSelected, setIsGlobalSelected] = useState(false);

  const isPageSelected = useMemo(() => {
    return (
      products.length > 0 && products.every((p) => selectedIds.includes(p.id))
    );
  }, [products, selectedIds]);

  const canShowGlobalBanner = useMemo(() => {
    return isPageSelected && !isGlobalSelected && total > products.length;
  }, [isPageSelected, isGlobalSelected, total, products.length]);

  const handleSelectPage = useCallback(() => {
    if (isGlobalSelected) {
      setIsGlobalSelected(false);
      setSelectedIds([]);
      return;
    }
    const currentIds = products.map((p) => p.id);
    if (isPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentIds])));
    }
  }, [isGlobalSelected, isPageSelected, products]);

  const toggleSelectRow = useCallback(
    (id: number) => {
      if (isGlobalSelected) {
        setIsGlobalSelected(false);
        setSelectedIds(
          products.map((p) => p.id).filter((itemId) => itemId !== id),
        );
      } else {
        setSelectedIds((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
      }
    },
    [isGlobalSelected, products],
  );

  return {
    selectedIds,
    isGlobalSelected,
    isPageSelected,
    canShowGlobalBanner,
    handleSelectPage,
    toggleSelectRow,
    setIsGlobalSelected,
    totalSelected: isGlobalSelected ? total : selectedIds.length,
    resetSelection: () => {
      setSelectedIds([]);
      setIsGlobalSelected(false);
    },
  };
};
