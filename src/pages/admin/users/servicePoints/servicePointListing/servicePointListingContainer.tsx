import axiosInstance from "@/api/axios";
import { useCallback, useState } from "react";
import type { Lead } from "@/types/customer-info/servicePoint";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import TableLayout from "@/components/layout/TableLayout";
import { type Column } from "@/components/dataManagement/dataTable/DataTableView";
import SearchInput from "@/components/inputs/SearchInputs";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/contexts/LoadingContext";
import { Button } from "@/components/ui/button";
import FilterIcon from "@/assets/icons/user-interface-filter.svg";
import SaveIcon from "@/assets/icons/user-interface-floppy-disk.svg";
import { useNavigate } from "react-router-dom";

export default function servicePointListingContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const columns: Column<Lead>[] = [
    { key: "name", label: LOCALIZATION_KEYS.COLS.NAME, visible: true },
    { key: "city", label: LOCALIZATION_KEYS.COLS.CITY, visible: true },
    {
      key: "stage",
      label: LOCALIZATION_KEYS.COLS.STAGE,
      visible: true,
    },
    {
      key: "sales_person",
      label: LOCALIZATION_KEYS.COLS.SALES_PERSON,
      visible: true,
    },
    { key: "phone", label: LOCALIZATION_KEYS.COLS.PHONE, visible: true },
  ];

  const fetchLeads = useCallback(
    async ({ page, limit }: { page: number; limit: number }) => {
      try {
        setLoading(true);

        const params: any = { page, limit };

        if (searchQuery.trim()) {
          params.q = searchQuery.trim();
        }

        const res = await axiosInstance.get("/crm/leads", { params });
        const leads = res?.data?.data?.leads?.map((l: any) => ({
          id: l.id,
          name: l.name,
          city: l.city,
          stage: l.stage,
          sales_person: l.user_id?.[1],
          phone: l.phone,
        }));

        return {
          data: leads,
          total: res.data.data.totalCount,
          totalPages: Math.ceil(res.data.data.totalCount / limit),
        };
      } catch (error) {
        console.error("Error fetching leads:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, setLoading]
  );

  return (
    <>
      <div className=" flex flex-col ">
        <div className="px-4 flex flex-wrap justify-between items-center  py-4 border-b">
          <div className="flex gap-3">
            <SearchInput
              value={searchQuery}
              onChange={(v) => setSearchQuery(v)}
              label={"UDC ID"}
              onSearch={() => {}}
              debounce={400}
              loading={false}
              size="md"
              className="w-[20vw]"
            />

            <SearchInput
              value={searchQuery}
              onChange={(v) => setSearchQuery(v)}
              label={t(LOCALIZATION_KEYS.COMMON.ITEMS)}
              onSearch={() => {}}
              debounce={400}
              loading={false}
              size="md"
              className="w-[35vw]"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              size="default"
              className="flex items-center gap-2  border border-primary rounded-md bg-primary cursor-pointer text-sm"
            >
              <img src={FilterIcon} alt="filter" className="w-5 h-5" />
              Filter
            </Button>

            <Button
              type="button"
              size="default"
              className="flex items-center gap-2 text-foreground border border-muted-foreground rounded-md bg-background cursor-pointer  text-sm"
            >
              <img src={SaveIcon} alt="filter" className="w-5 h-5" />
              Save View
            </Button>
          </div>
        </div>

        <div className="bg-accent py-4 xl:h-[75vh] 2xl:h-[86vh]">
          <TableLayout
            columns={columns}
            fetchData={fetchLeads}
            showSettingButton
            showAddButton
            showDownloadButton
            headerTitle="Service Points"
            className="max-h-[60vh] 2xl:max-h-[75vh]"
            externalSearch={searchQuery}
            onRowClick={(row) =>
              navigate(`/dashboard/service_points/details`)
            }
          />
        </div>
      </div>
    </>
  );
}
