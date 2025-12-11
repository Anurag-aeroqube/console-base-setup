import { useEffect, useState } from "react";
import PaginationFooter from "@/components/layout/PaginationFooter";
import DataTableContainer from "../dataManagement/dataTable/DataTableContainer";
import type { Column } from "../dataManagement/dataTable/DataTableView";

type Props<T> = {
  columns: Column<T>[];
  fetchData: (params: {
    page: number;
    limit: number;
    search: string;
  }) => Promise<{
    data: T[];
    total: number;
    totalPages: number;
  }>;
  className?: string;
  externalSearch?: string;
  onRowClick?: (item: T) => void;
  headerTitle?: string;
  showSettingButton?:boolean;
  showAddButton?: boolean;
  showDownloadButton?: boolean;
  onAddClick?: () => void;
  onDownloadClick?: () => void;
};

export default function TableLayout<T extends Record<string, any>>({
  columns,
  fetchData,
  className,
  externalSearch = "",
  onRowClick,
  headerTitle,
  showSettingButton,
  showAddButton,
  showDownloadButton,
  onAddClick,
  onDownloadClick,
}: Props<T>) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadData = async () => {
    const res = await fetchData({ page, limit, search });
    setData(res.data);
    setTotal(res.total);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    setSearch(externalSearch);
    setPage(1);
  }, [externalSearch]);

  useEffect(() => {
    loadData();
  }, [page, limit, search, fetchData]);

  return (
    <div className="flex flex-col w-[98%] mx-auto h-full">
      <DataTableContainer
        data={data}
        columns={columns}
        onSearch={() => {}}
        onPageChange={setPage}
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        onLimitChange={setLimit}
        containerClassName={className}
        onRowClick={(item) => onRowClick?.(item)}
        headerTitle={headerTitle}
        showSettingButton={showSettingButton}
        showAddButton={showAddButton}
        showDownloadButton={showDownloadButton}
        onAddClick={onAddClick}
        onDownloadClick={onDownloadClick}
      />

      {data.length > 0 && (
        <div className="sticky bottom-0 w-full bg-background border-t z-20">
          <PaginationFooter
            pagination={{ page, limit, total }}
            onPageChange={setPage}
            onLimitChange={setLimit}
            type="numbered"
          />
        </div>
      )}
    </div>
  );
}
