import React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, ...props }, ref) => {
    return (
      <label className="flex items-center justify-center cursor-pointer relative">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <div className="w-[22px] h-[22px] border-2 border-gray-300 bg-white rounded transition-all peer-checked:border-[#3C538E] peer-checked:bg-[#3C538E] peer-hover:border-gray-400 flex items-center justify-center" />
      </label>
    );
  },
);
