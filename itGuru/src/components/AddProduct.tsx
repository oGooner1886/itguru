import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    brand: "",
    sku: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.price ||
      !formData.brand ||
      !formData.sku
    ) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }
    toast.success(`Товар "${formData.title}" успешно добавлен!`);
    setFormData({ title: "", price: "", brand: "", sku: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-[500px] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка модалки */}
        <div className="p-8 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-2xl font-bold text-[#111827] font-cairo">
            Новый товар
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-gray-500 ml-1">
              Наименование
            </label>
            <input
              type="text"
              className="w-full px-5 py-4 bg-[#F8F9FB] rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
              placeholder="Напр: iPhone 15 Pro"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-500 ml-1">
                Цена (₽)
              </label>
              <input
                type="number"
                className="w-full px-5 py-4 bg-[#F8F9FB] rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
                placeholder="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-500 ml-1">
                Вендор
              </label>
              <input
                type="text"
                className="w-full px-5 py-4 bg-[#F8F9FB] rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
                placeholder="Apple"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-bold text-gray-500 ml-1">
              Артикул (SKU)
            </label>
            <input
              type="text"
              className="w-full px-5 py-4 bg-[#F8F9FB] rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
              placeholder="SKU-12345"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-[#2D4BFF] text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
            >
              Добавить товар
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
