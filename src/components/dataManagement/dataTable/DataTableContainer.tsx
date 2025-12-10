import { useEffect, useRef, useState } from "react";
import DataTableView, { type Column } from "./DataTableView";

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
  containerClassName?: string;
  onRowClick?: (item: T, index: number) => void;
  headerTitle?: string;
  showSettingButton?: boolean;
  showAddButton?: boolean;
  showDownloadButton?: boolean;
  onAddClick?: () => void;
  onDownloadClick?: () => void;
};

export default function DataTableContainer<T extends { [key: string]: any }>({
  data,
  columns,
  onSearch,
  containerClassName = "",
  onRowClick,
  headerTitle,
  showSettingButton,
  showAddButton,
  showDownloadButton,
  onAddClick,
  onDownloadClick,
}: Props<T>) {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCols, setVisibleCols] = useState(
    columns.map((col) => ({ ...col, width: col.width || 150 }))
  );
  const [columnSearch, setColumnSearch] = useState("");
  const [resizing, setResizing] = useState<{
    key: keyof T;
    startX: number;
    startWidth: number;
  } | null>(null);
  const [rowHeights, setRowHeights] = useState<{ [key: number]: number }>({});
  const [resizingRow, setResizingRow] = useState<{
    index: number;
    startY: number;
    startHeight: number;
  } | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Search debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery, onSearch]);

  // Toggle column visibility
  const toggleColumn = (key: keyof T) => {
    setVisibleCols((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // Close menu on outside click
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

  

  // Column resize handlers
  const handleColumnMouseDown = (
    e: React.MouseEvent,
    key: keyof T,
    currentWidth: number
  ) => {
    e.preventDefault();
    setResizing({ key, startX: e.clientX, startWidth: currentWidth });
  };

  // Row resize handlers
  const handleRowMouseDown = (
    e: React.MouseEvent,
    index: number,
    currentHeight: number
  ) => {
    e.preventDefault();
    setResizingRow({ index, startY: e.clientY, startHeight: currentHeight });
  };

  // Mouse move and up handlers for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing) {
        const diff = e.clientX - resizing.startX;
        const newWidth = Math.max(50, resizing.startWidth + diff);
        setVisibleCols((prev) =>
          prev.map((col) =>
            col.key === resizing.key ? { ...col, width: newWidth } : col
          )
        );
      }

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

  const getCellContent = (col: Column<T>, item: T) => {
    let transformedCellTitle: string = (item[col.key] as string) || "-";
    let tranformedCellJsx = () => {
      return (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap block">
          {item[col.key] || "-"}
        </div>
      );
    };

    if (col.transformer) {
      const transformedValue = col.transformer(item[col.key]);

      switch (transformedValue.type) {
        case "string":
          transformedCellTitle = transformedValue.value;
          tranformedCellJsx = () => {
            return (
              <div className="overflow-hidden text-ellipsis whitespace-nowrap block">
                {transformedValue.value}
              </div>
            );
          };
          break;

        case "single-chip":
        case "multi-chip":
          transformedCellTitle = transformedValue.value;
          tranformedCellJsx = () =>
            transformedValue.jsx || (
              <div className="overflow-hidden text-ellipsis whitespace-nowrap block">
                {transformedValue.value}
              </div>
            );
          break;

        default:
          if (transformedValue.jsx) {
            transformedCellTitle = transformedValue.value;
            tranformedCellJsx = () =>
              transformedValue.jsx || (
                <div className="overflow-hidden text-ellipsis whitespace-nowrap block">
                  {transformedValue.value}
                </div>
              );
          }
      }
    }

    return { tranformedCellJsx, transformedCellTitle };
  };

  return (
    <DataTableView
      data={data}
      visibleCols={visibleCols}
      searchQuery={searchQuery}
      columnSearch={columnSearch}
      toggleBtn={toggleBtn}
      menuRef={menuRef}
      buttonRef={buttonRef}
      rowHeights={rowHeights}
      onToggleBtn={() => setToggleBtn(!toggleBtn)}
      onColumnSearchChange={setColumnSearch}
      onToggleColumn={toggleColumn}
      onColumnMouseDown={handleColumnMouseDown}
      onRowMouseDown={handleRowMouseDown}
      containerClassName={containerClassName}
      getCellContent={getCellContent}
      onRowClick={onRowClick}
      headerTitle={headerTitle}
      showSettingButton={showSettingButton}
      showAddButton={showAddButton}
      showDownloadButton={showDownloadButton}
      onAddClick={onAddClick}
      onDownloadClick={onDownloadClick}
    />
  );
}
