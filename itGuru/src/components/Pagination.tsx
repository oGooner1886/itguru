import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export const Pagination = ({
  currentPage,
  total,
  limit,
  onPageChange,
  loading,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);

  const getPages = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    for (let i = start; i <= end; i++) {
      if (i >= 1) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="p-2 text-gray-400 hover:text-[#2D4BFF] disabled:opacity-20"
      >
        <ChevronLeft size={20} />
      </button>

      {getPages().map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-xl text-[14px] font-bold transition-all ${
            currentPage === p
              ? "bg-[#2D4BFF] text-white shadow-md"
              : "text-gray-400 hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || total === 0 || loading}
        className="p-2 text-gray-400 hover:text-[#2D4BFF] disabled:opacity-20"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
