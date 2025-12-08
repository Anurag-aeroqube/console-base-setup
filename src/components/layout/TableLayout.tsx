import { useEffect, useState } from "react";
import PaginationFooter from "@/components/layout/PaginationFooter";
import DataTableContainer from "../data-management/data-table/DataTableContainer";
import type { Column } from "../data-management/data-table/DataTableView";


type Props<T> = {
  columns: Column<T>[];
  fetchData: (params: { page: number; limit: number; search: string }) => Promise<{
    data: T[];
    total: number;
    totalPages: number;
  }>;
  className?: string;
   externalSearch?: string;
};

export default function TableLayout<T extends Record<string, any>>({
  columns,
  fetchData,
  className,
  externalSearch = "",
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
    setPage(1);
  }, [externalSearch]);

  useEffect(() => {
    loadData();
  }, [page, limit, fetchData]);

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
      />

      {data.length > 0 && (
      <PaginationFooter
        pagination={{ page, limit, total }}
        onPageChange={setPage}
        onLimitChange={setLimit}
        type="numbered"
      />
      )}
    </div>
  );
}
