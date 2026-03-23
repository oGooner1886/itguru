import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "icon";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#2D4BFF] text-white px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700",
    secondary:
      "bg-[#242EDB] text-white w-[52px] h-[27px] rounded-[23px] hover:bg-blue-700",
    outline:
      "p-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-500",
    icon: "w-[27px] h-[27px] border border-gray-200 rounded-full text-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
