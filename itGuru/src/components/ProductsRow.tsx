import React, { useCallback } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import type { Product } from "../types";
import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";

interface ProductRowProps {
  product: Product;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

export const ProductRow = React.memo(
  ({ product, isSelected, onToggle }: ProductRowProps) => {
    const handleSelect = useCallback(() => {
      onToggle(product.id);
    }, [onToggle, product.id]);
    return (
      <tr
        className={`border-b border-[#E2E2E2] transition-all duration-200 ${
          isSelected ? "bg-[#F4F7FF]" : "hover:bg-gray-50/50"
        }`}
      >
        <td className="py-4 px-6 w-10 relative">
          {isSelected && (
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#2D4BFF] shadow-[2px_0_10px_rgba(45,75,255,0.4)]" />
          )}
          <Checkbox checked={isSelected} onChange={handleSelect} />
        </td>
        <td className="py-4 px-2 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-50">
            <img
              src={product.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-cairo font-bold text-[16px] text-[#111827]">
              {product.title}
            </div>
            <div className="font-cairo text-[14px] text-[#B2B3B9] capitalize">
              {product.category}
            </div>
          </div>
        </td>
        <td className="py-4 px-2 text-[16px] font-bold text-[#000] font-openSans">
          {product.brand || "—"}
        </td>
        <td className="py-4 px-2 text-[16px] text-[#000] font-openSans">
          {product.sku}
        </td>
        <td
          className={`py-4 px-2 text-[16px] font-openSans ${product.rating < 3.5 ? "text-red-500" : "text-[#000]"}`}
        >
          {product.rating} <span className="text-gray-400">/ 5</span>
        </td>
        <td className="py-4 px-2 text-[16px] font-regular text-center font-robotoMono text-[#000]">
          {(() => {
            const formatted = product.price.toLocaleString("ru-RU");
            const [integerPart, decimalPart] = formatted.split(",");

            return (
              <>
                <span>{integerPart}</span>
                {decimalPart !== undefined && (
                  <span className="text-gray-400">,{decimalPart}</span>
                )}
                <span className="text-gray-400 text-[16px] ml-0.5"> ₽</span>
              </>
            );
          })()}
        </td>
        <td className="py-4 px-4 text-right">
          <div className="flex justify-end items-center gap-3 pr-4">
            <Button
              variant="secondary"
              onClick={() => console.log("Добавлено:", product.id)}
              title="Добавить"
            >
              <Plus size={16} strokeWidth={3} />
            </Button>
            <Button
              variant="icon"
              onClick={() => console.log("Меню:", product.id)}
            >
              <MoreHorizontal size={14} />
            </Button>
          </div>
        </td>
      </tr>
    );
  },
);
