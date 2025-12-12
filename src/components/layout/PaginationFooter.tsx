import type { PaginationParams } from "@/types/data-management";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import { useTranslation } from "react-i18next";

type PaginationType = "simple" | "detailed" | "numbered";

interface PaginationFooterProps {
  pagination: PaginationParams;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limits?: number[];
  type?: PaginationType;
}

export default function PaginationFooter({
  pagination,
  onPageChange,
  onLimitChange,
  limits = [10, 25, 50, 100],
  type = "detailed",
}: PaginationFooterProps) {
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);
  const { t } = useTranslation();

  // Generate page numbers for numbered pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    // const maxVisible = 5; // Show max 5 page numbers at a time

    // If total pages are 6 or less, show all pages
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Logic for pages 7+
    if (page <= 3) {
      // Near the start: 1 2 3 4 ... last
      for (let i = 2; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (page >= totalPages - 2) {
      // Near the end: 1 ... (last-3) (last-2) (last-1) last
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle: 1 ... (page-1) page (page+1) ... last
      pages.push("...");
      pages.push(page - 1);
      pages.push(page);
      pages.push(page + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  // Type 1: Simple Pagination (Prev/Next only)
  if (type === "simple") {
    return (
      <div className=" bg-background px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (type === "detailed") {
    return (
      <div className="border-t bg-background px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show result:</span>

          <Select
            value={String(limit)}
            onValueChange={(val) => onLimitChange(Number(val))}
          >
            <SelectTrigger className="h-9 text-sm bg-background cursor-pointer border border-primary">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-background">
              {limits.map((l) => (
                <SelectItem
                  key={l}
                  value={String(l)}
                  className="data-[state=checked]:bg-primary cursor-pointer data-[state=checked]:text-background"
                >
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            <span className="text-sm">Page</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) => {
                const newPage = Number(e.target.value);
                if (newPage >= 1 && newPage <= totalPages) {
                  onPageChange(newPage);
                }
              }}
              className="w-16 h-9 text-center"
            />
            <span className="text-sm">of {totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 cursor-pointer" />
          </Button>
        </div>
      </div>
    );
  }

  // Type 3: Numbered Pagination (1, 2, 3, 4, 5 style)
  if (type === "numbered") {
    return (
      <div className=" border-b border-x boder-y bg-background px-6 py-4 flex  items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t(LOCALIZATION_KEYS.SUMMARY_FIELDS.SHOW_RESULT)} :</span>
          <Select
            value={String(limit)}
            onValueChange={(val) => onLimitChange(Number(val))}
          >
            <SelectTrigger className="h-9 text-sm bg-background cursor-pointer border border-primary">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-background">
              {limits.map((l) => (
                <SelectItem
                  key={l}
                  value={String(l)}
                  className="data-[state=checked]:bg-primary cursor-pointer data-[state=checked]:text-background"
                >
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>



        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
          >
            <ChevronsLeft className="h-4 w-4 cursor-pointer" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4 " />
          </Button>

          {getPageNumbers().map((pageNum, index) =>
            pageNum === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="icon"
                className="h-9 w-9 cursor-pointer"
                onClick={() => onPageChange(Number(pageNum))}
              >
                {pageNum}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4 cursor-pointer" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
          >
            <ChevronsRight className="h-4 w-4 " />
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
