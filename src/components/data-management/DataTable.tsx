import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import SearchInput from "@/components/inputs/SearchInputs";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import AddIcon from "@/assets/icons/add.svg?react";
import  DownloadIcon  from "@/assets/icons/download.svg?react";



export type Column<T> = {
  key: keyof T;
  label: string;
  visible: boolean;
  width?: number; 
  transformer?: (value: any) => string;
};

type PaginationType = 'simple' | 'numbered' | 'detailed';

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  page: number;
  totalPages: number;
  total?: number;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  paginationType?: PaginationType;
  containerClassName?: string;
};

export default function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  onSearch,
  onPageChange,
  page,
  totalPages,
  total = 0,
  limit = 10,
  onLimitChange = () => {},
  paginationType = 'detailed',
   containerClassName = "",
}: Props<T>) {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCols, setVisibleCols] = useState(
    columns.map(col => ({ ...col, width: col.width || 150 }))
  );
  const [columnSearch, setColumnSearch] = useState("");
  const [resizing, setResizing] = useState<{ key: keyof T; startX: number; startWidth: number } | null>(null);
  const [rowHeights, setRowHeights] = useState<{ [key: number]: number }>({});
  const [resizingRow, setResizingRow] = useState<{ index: number; startY: number; startHeight: number } | null>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const toggleColumn = (key: keyof T) => {
    setVisibleCols((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setToggleBtn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Resize handlers for columns
  const handleMouseDown = (e: React.MouseEvent, key: keyof T, currentWidth: number) => {
    e.preventDefault();
    setResizing({ key, startX: e.clientX, startWidth: currentWidth });
  };

  // Resize handlers for rows
  const handleRowMouseDown = (e: React.MouseEvent, index: number, currentHeight: number) => {
    e.preventDefault();
    setResizingRow({ index, startY: e.clientY, startHeight: currentHeight });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Column resizing - independent width
      if (resizing) {
        const diff = e.clientX - resizing.startX;
        const newWidth = Math.max(50, resizing.startWidth + diff);

        setVisibleCols((prev) =>
          prev.map((col) =>
            col.key === resizing.key ? { ...col, width: newWidth } : col
          )
        );
      }

      // Row resizing
      if (resizingRow) {
        const diff = e.clientY - resizingRow.startY;
        const newHeight = Math.max(30, resizingRow.startHeight + diff);

        setRowHeights((prev) => ({
          ...prev,
          [resizingRow.index]: newHeight,
        }));
      }
    };

    const handleMouseUp = () => {
      setResizing(null);
      setResizingRow(null);
    };

    if (resizing || resizingRow) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, resizingRow]);

  return (
<div
  className={`flex flex-col border rounded-md
  ${containerClassName ? containerClassName : "xl:max-h-[78vh] 2xl:max-h-[80vh] 2xl:min-h-[10vh]"}`}
>
      <div className="flex items-center justify-between w-full py-2 px-2  bg-background">
        <div className="flex gap-3 justify-center items-center">
            <p className="font-semibold text-lg">Anurag</p>
           <AddIcon className="w-6 h-6 text-background" />
           <DownloadIcon className="w-6 h-6 text-red-500" />


        </div>
        <div className="relative">
          <Button
            ref={buttonRef}
            className="px-3 py-2 cursor-pointer  rounded-xl"
            onClick={() => setToggleBtn(!toggleBtn)}
            variant="ghost"
            size="icon"
          >
            <GiHamburgerMenu />
          </Button>
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 2xl:w-[15vw] xl:w-[20vw] border bg-background rounded-md shadow-md z-10 p-2 space-y-2 transition-opacity
      ${toggleBtn ? "opacity-100 visible " : "opacity-0 invisible"}
    `}
          >
            <SearchInput
              value={columnSearch}
              onChange={setColumnSearch}
              label={t(LOCALIZATION_KEYS.COMMON.COLUMNS)}
              size="sm"
              debounce={0}
              clearable={true}
              loading={false}
              className="2xl:w-[14vw] xl:w-[19vw] "
            />

            <div className="min-h-[10vh] xl:max-h-[40vh] 2xl:max-h-[25vh] overflow-y-auto space-y-2">
              {visibleCols.filter((col) =>
                t(col.label).toLowerCase().includes(columnSearch.toLowerCase())
              ).length > 0 ? (
                visibleCols
                  .filter((col) =>
                    t(col.label)
                      .toLowerCase()
                      .includes(columnSearch.toLowerCase())
                  )
                  .map((col) => (
                    <label
                      key={String(col.key)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={col.visible}
                        onChange={() => toggleColumn(col.key)}
                        className="cursor-pointer accent-primary"
                      />
                      <span className="capitalize">{t(col.label)}</span>
                    </label>
                  ))
              ) : (
                 <div className="flex flex-col items-center h-[20vh] justify-center gap-1 py-8 text-center text-muted-foreground">
        <p className="font-medium text-foreground">
          {t(LOCALIZATION_KEYS.MESSAGES.EMPTY_SEARCH_TITLE)}
        </p>
        <p className="text-sm">
          {t(LOCALIZATION_KEYS.MESSAGES.EMPTY_SEARCH_SUBTEXT)}
        </p>
      </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" xl:flex-1  overflow-auto   ">
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
          <thead className="text-left  text-sm border text-muted-foreground sticky top-0 bg-background z-5">
            <tr>
              {visibleCols
                .filter((col) => col.visible)
                .map((col) => (
                  <th 
                    key={String(col.key)} 
                    className="p-3 font-medium border-r border-b last:border-r-0 relative"
                    style={{ 
                      width: `${col.width}px`, 
                      maxWidth: `${col.width}px`,
                      minWidth: `${col.width}px`
                    }}
                  >
                    <div className="flex items-center justify-between overflow-hidden">
                      <span className="truncate block">{t(col.label)}</span>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary hover:w-1.5 transition-all flex-shrink-0"
                        onMouseDown={(e) => handleMouseDown(e, col.key, col.width || 150)}
                      />
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="text-sm divide-y bg-background text-foreground">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr 
                  key={index}
                  className="relative"
                  style={{ 
                    height: rowHeights[index] ? `${rowHeights[index]}px` : 'auto'
                  }}
                >
                  {visibleCols
                    .filter((col) => col.visible)
                    .map((col) => (
                      <td 
                        key={String(col.key)} 
                        className="p-3 border-r last:border-r-0 relative"
                        style={{ 
                          width: `${col.width}px`,
                          maxWidth: `${col.width}px`,
                          minWidth: `${col.width}px`,
                          height: rowHeights[index] ? `${rowHeights[index]}px` : 'auto',
                          verticalAlign: 'top'
                        }}
                        title={col.transformer ? col.transformer(item[col.key]) : item[col.key] || "-"}
                      >
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap block">
                          {col.transformer
                            ? col.transformer(item[col.key])
                            : item[col.key] || "-"}
                        </div>
                        {/* Row resize handle - only on first column */}
                        {col === visibleCols.filter(c => c.visible)[0] && (
                          <div
                            className="absolute bottom-0 left-0 right-0 h-1 cursor-row-resize hover:bg-primary hover:h-1.5 transition-all z-10"
                            onMouseDown={(e) => handleRowMouseDown(e, index, rowHeights[index] || 40)}
                          />
                        )}
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={visibleCols.filter((c) => c.visible).length}
                  className="text-center py-6 h-[40vh] "
                >
                  {searchQuery
                    ? `No results found for "${searchQuery}"`
                    : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}