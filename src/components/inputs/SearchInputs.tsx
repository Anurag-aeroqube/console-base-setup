import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Search, X } from "lucide-react";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import { useTranslation } from "react-i18next";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  label?: string;

  debounce?: number;
  clearable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;

  className?: string;
  size?: "sm" | "md" | "lg";
  "aria-label"?: string;
}

const sizeClasses = {
  sm: "h-8 text-sm px-3",
  md: "h-10 text-sm px-4",
  lg: "h-12 text-base px-5",
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  label,
  placeholder,
  debounce = 300,
  clearable = true,
  loading = false,
  disabled = false,
  autoFocus = false,
  size = "md",
  className = "",
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
    const { t } = useTranslation();

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internalValue);
      onSearch?.(internalValue);
    }, debounce);

    return () => clearTimeout(handler);
  }, [internalValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(internalValue);
    }
  };

   const placeholderText =
    placeholder ||
    `${t(LOCALIZATION_KEYS.COMMON.SEARCH)} ${label || t(LOCALIZATION_KEYS.COMMON.ITEMS)}...`;

  return (
    <div
      className={cn(
        "relative flex w-[20vw] items-center border bg-background rounded-md shadow-sm focus-within:ring-2 focus-within:ring-primary",
        sizeClasses[size],
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />

      <input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholderText}
        className="w-full bg-transparent px-8 focus:outline-none"
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        disabled={disabled}
        {...props}
      />

      {loading ? (
        <Loader2 className="absolute right-3 w-4 h-4 animate-spin text-muted-foreground" />
      ) : (
        clearable &&
        internalValue && (
          <X
            className="absolute right-3 w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={() => {
              setInternalValue("");
              onChange("");
              onSearch?.("");
            }}
          />
        )
      )}
    </div>
  );
};

export default SearchInput;
