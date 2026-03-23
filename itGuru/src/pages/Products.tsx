import { useState, useEffect } from "react";

import {
  Search,
  Plus,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

import { ProductRow } from "../components/ProductsRow";
import { AddProductModal } from "../components/AddProduct";
import { Checkbox } from "../components/ui/Checkbox";
import { Pagination } from "../components/Pagination";

import { useProducts } from "../hooks/useProducts";
import { useSelection } from "../hooks/useSelection";
import type { SortConfig, Product } from "../types";

const SORT_KEY = "products_sort_config";

export const Products = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const [sortConfig, setSortConfig] = useState<SortConfig>(() => {
    const saved = localStorage.getItem(SORT_KEY);
    return saved ? JSON.parse(saved) : { key: "", order: "" };
  });

  const { products, total, loading, refetch } = useProducts(
    page,
    search,
    sortConfig,
  );
  const selection = useSelection(products, total);

  useEffect(() => {
    localStorage.setItem(SORT_KEY, JSON.stringify(sortConfig));
  }, [sortConfig]);

  const handleManualRefresh = async () => {
    if (loading) return;
    setIsSpinning(true);
    await refetch();
    setTimeout(() => setIsSpinning(false), 600);
  };

  const handleSort = (key: keyof Product) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const getSortIcon = (key: keyof Product) => {
    if (sortConfig.key !== key)
      return <ArrowUpDown size={14} className="opacity-20" />;
    return sortConfig.order === "asc" ? (
      <ArrowUp size={14} className="text-[#2D4BFF]" />
    ) : (
      <ArrowDown size={14} className="text-[#2D4BFF]" />
    );
  };

  return (
    <div className="p-[30px] max-w-[1920px] mx-auto min-h-screen bg-[#F8F9FB] font-cairo">
      <Toaster position="top-center" />
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <div className="flex flex-col md:flex-row items-center gap-[310px] bg-white p-6 rounded-[32px] shadow-sm mb-8 border border-gray-100 ">
        <h1 className="text-2xl font-bold text-[#111827]">Товары</h1>
        <div className="relative flex-1 w-full ">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <input
            className="w-full pl-14 pr-6 py-4 bg-[#F8F9FB] rounded-[20px] outline-none text-[15px] focus:ring-2 focus:ring-blue-100"
            placeholder="Найти"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent overflow-hidden z-20">
          {loading && (
            <div className="h-full bg-[#2D4BFF] animate-[progress_1.5s_ease-in-out_infinite] w-1/3 absolute" />
          )}
        </div>

        {selection.canShowGlobalBanner && (
          <div className="bg-blue-50 px-8 py-3 flex items-center justify-center gap-2 border-b border-blue-100">
            <span className="text-[14px] text-blue-800">
              Выбрано {products.length} на странице.
            </span>
            <button
              onClick={() => selection.setIsGlobalSelected(true)}
              className="text-[14px] font-bold text-[#2D4BFF] hover:underline"
            >
              Выбрать все {total} товаров
            </button>
          </div>
        )}

        <div className="p-[30px] flex justify-between items-center border-b border-gray-50">
          <h2 className="text-xl font-bold text-[#111827]">Все позиции</h2>
          <div className="flex gap-4">
            <button
              onClick={handleManualRefresh}
              disabled={loading || isSpinning}
              className="p-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw
                size={20}
                className={`text-gray-500 ${loading || isSpinning ? "animate-spin text-[#2D4BFF]" : ""}`}
              />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2D4BFF] text-white px-8 py-3.5 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              <Plus size={20} /> Добавить
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#B2B3B9] text-[16px] font-bold border-b border-[#E2E2E2] bg-gray-50/20">
                <th className="py-4 px-6 w-10">
                  <Checkbox
                    checked={
                      selection.isPageSelected || selection.isGlobalSelected
                    }
                    onChange={selection.handleSelectPage}
                  />
                </th>
                <th
                  className="py-4 px-2 cursor-pointer group"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center gap-2">
                    Наименование {getSortIcon("title")}
                  </div>
                </th>
                <th
                  className="py-4 px-2 cursor-pointer group"
                  onClick={() => handleSort("brand")}
                >
                  <div className="flex items-center gap-2">
                    Вендор {getSortIcon("brand")}
                  </div>
                </th>
                <th className="py-4 px-2">Артикул</th>
                <th
                  className="py-4 px-2 cursor-pointer group"
                  onClick={() => handleSort("rating")}
                >
                  <div className="flex items-center gap-2">
                    Рейтинг {getSortIcon("rating")}
                  </div>
                </th>
                <th
                  className="py-4 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center justify-center gap-2">
                    Цена, ₽ {getSortIcon("price")}
                  </div>
                </th>
                <th className="py-4 px-4 w-32"></th>
              </tr>
            </thead>
            <tbody
              className={`divide-y divide-gray-50 transition-opacity duration-300 ${loading ? "opacity-40" : ""}`}
            >
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  isSelected={
                    selection.isGlobalSelected ||
                    selection.selectedIds.includes(p.id)
                  }
                  onToggle={() => selection.toggleSelectRow(p.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-gray-50 flex justify-between items-center">
          <div className="text-[14px] text-gray-400 font-openSans">
            Показано{" "}
            <b>
              {total === 0 ? 0 : (page - 1) * 20 + 1}-
              {Math.min(page * 20, total)}
            </b>{" "}
            из {total}
            {selection.totalSelected > 0 && (
              <span className="ml-4 text-[#3C538E] font-bold">
                Выбрано: {selection.totalSelected}
              </span>
            )}
          </div>
          <Pagination
            currentPage={page}
            total={total}
            limit={20}
            onPageChange={setPage}
            loading={loading}
          />
        </div>
      </div>
      <style>{`@keyframes progress { 0% { left: -30%; } 100% { left: 100%; } }`}</style>
    </div>
  );
};
