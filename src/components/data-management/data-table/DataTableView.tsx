import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import SearchInput from "@/components/inputs/SearchInputs";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import AddIcon from "@/assets/icons/add.svg?react";
import DownloadIcon from "@/assets/icons/download.svg?react";

export type Column<T> = {
  key: keyof T;
  label: string;
  visible: boolean;
  width?: number;
  transformer?: (value: any) => string;
};

type Props<T> = {
  data: T[];
  visibleCols: (Column<T> & { width: number })[];
  searchQuery: string;
  columnSearch: string;
  toggleBtn: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  rowHeights: { [key: number]: number };
  onToggleBtn: () => void;
  onColumnSearchChange: (value: string) => void;
  onToggleColumn: (key: keyof T) => void;
  onColumnMouseDown: (e: React.MouseEvent, key: keyof T, width: number) => void;
  onRowMouseDown: (e: React.MouseEvent, index: number, height: number) => void;
  containerClassName?: string;
};

export default function DataTableView<T extends { [key: string]: any }>({
  data,
  visibleCols,
  searchQuery,
  columnSearch,
  toggleBtn,
  menuRef,
  buttonRef,
  rowHeights,
  onToggleBtn,
  onColumnSearchChange,
  onToggleColumn,
  onColumnMouseDown,
  onRowMouseDown,
  containerClassName = "",
}: Props<T>) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col border rounded-md
      ${containerClassName ? containerClassName : "xl:max-h-[78vh] 2xl:max-h-[80vh] 2xl:min-h-[10vh]"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full py-2 px-2 bg-background">
        <div className="flex gap-3 justify-center items-center">
          <p className="font-semibold text-lg">Anurag</p>
          <AddIcon className="w-6 h-6 text-background" />
          <DownloadIcon className="w-6 h-6 text-red-500" />
        </div>

        <div className="relative">
          <Button
            ref={buttonRef}
            className="px-3 py-2 cursor-pointer rounded-xl"
            onClick={onToggleBtn}
            variant="ghost"
            size="icon"
          >
            <GiHamburgerMenu />
          </Button>

          {/* Column Menu */}
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 2xl:w-[15vw] xl:w-[20vw] border bg-background rounded-md shadow-md z-10 p-2 space-y-2 transition-opacity
              ${toggleBtn ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <SearchInput
              value={columnSearch}
              onChange={onColumnSearchChange}
              label={t(LOCALIZATION_KEYS.COMMON.COLUMNS)}
              size="sm"
              debounce={0}
              clearable={true}
              loading={false}
              className="2xl:w-[14vw] xl:w-[19vw]"
            />

            <div className="min-h-[10vh] xl:max-h-[40vh] 2xl:max-h-[25vh] overflow-y-auto space-y-2">
              {visibleCols.filter((col) =>
                t(col.label).toLowerCase().includes(columnSearch.toLowerCase())
              ).length > 0 ? (
                visibleCols
                  .filter((col) =>
                    t(col.label).toLowerCase().includes(columnSearch.toLowerCase())
                  )
                  .map((col) => (
                    <label
                      key={String(col.key)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={col.visible}
                        onChange={() => onToggleColumn(col.key)}
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

      {/* Table */}
      <div className="xl:flex-1 overflow-auto">
        <table className="w-full" style={{ tableLayout: "fixed" }}>
          <thead className="text-left text-sm border text-muted-foreground sticky top-0 bg-background z-5">
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
                      minWidth: `${col.width}px`,
                    }}
                  >
                    <div className="flex items-center justify-between overflow-hidden">
                      <span className="truncate block">{t(col.label)}</span>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary hover:w-1.5 transition-all flex-shrink-0"
                        onMouseDown={(e) => onColumnMouseDown(e, col.key, col.width)}
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
                    height: rowHeights[index] ? `${rowHeights[index]}px` : "auto",
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
                          height: rowHeights[index] ? `${rowHeights[index]}px` : "auto",
                          verticalAlign: "top",
                        }}
                        title={
                          col.transformer
                            ? col.transformer(item[col.key])
                            : item[col.key] || "-"
                        }
                      >
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap block">
                          {col.transformer
                            ? col.transformer(item[col.key])
                            : item[col.key] || "-"}
                        </div>
                        {/* Row resize handle */}
                        {col === visibleCols.filter((c) => c.visible)[0] && (
                          <div
                            className="absolute bottom-0 left-0 right-0 h-1 cursor-row-resize hover:bg-primary hover:h-1.5 transition-all z-10"
                            onMouseDown={(e) =>
                              onRowMouseDown(e, index, rowHeights[index] || 40)
                            }
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
                  className="text-center py-6 h-[40vh]"
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