import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, icon, ...props }) {
  return (
    <div className="relative flex items-center">
      {icon && <span className="absolute left-3 text-[#686868]">{icon}</span>}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base text-[16px] shadow-none transition-[color,box-shadow] outline-none",
          "border-0 focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0",
          "placeholder-[#686868]", // <-- Add this line
          icon ? "pl-10" : "",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
