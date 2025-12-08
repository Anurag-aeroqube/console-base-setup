import { useDataManagement } from "@/hooks/useDataManagement";
import ListView from "@/components/layout/TableLayout";
import FiltersBar from "@/components/layout/FiltersBar";
import PaginationFooter from "@/components/layout/PaginationFooter";
import axiosInstance from "@/api/axios";
import type { ListViewConfig } from "@/types/data-management";

interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status?: string;
}

const columns: ListViewConfig<Lead>["columns"] = [
  { key: "name", label: "Lead Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", sortable: true },
];

const leadFilters: ListViewConfig<Lead>["filters"] = [
  {
    key: "search",
    label: "Search Lead",
    type: "text",
    placeholder: "Search by name...",
  },
];

export default function LeadsPage() {
  const { state, setFilters, setSorting, setPagination, setSelectedRows } =
    useDataManagement<Lead>({
      fetchData: async ({ filters, sort, pagination }) => {
        const params: any = {
          page: pagination.page,
          limit: pagination.limit,
          sortOrder: sort?.direction ?? "asc",
        };

        if (filters.search) params.search = filters.search;

        const res = await axiosInstance.get("/crm/leads", { params });

        return {
          data: res.data?.data ?? res.data?.results ?? [],
          total: res.data?.pagination?.total ?? 0,
        };
      },
    });

  return (
    <div className="p-6 space-y-4">
      
      <FiltersBar
        filters={leadFilters}
        actions={[]}
        onFilterChange={(f) => setFilters(f as any)} // fixed rename
      />

      <ListView
        config={{ columns, actions: [] }} //  filters removed (important)
        state={state}
        onRowSelect={setSelectedRows}
        onSort={(field, direction) => setSorting({ field, direction })}
      />

      <PaginationFooter
        pagination={state.pagination}
        onPageChange={(page) => setPagination({ page })}
        onLimitChange={(limit) => setPagination({ limit, page: 1 })}
      />

    </div>
  );
}
