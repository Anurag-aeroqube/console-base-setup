import axiosInstance from "@/api/axios";
import { useCallback, useState } from "react";
import type { Lead } from "@/types/customer-info/servicePoint";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import TableLayout from "@/components/layout/TableLayout";
import { type Column } from "@/components/dataManagement/dataTable/DataTableView";
import SearchInput from "@/components/inputs/SearchInputs";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import {
  SlideOverFormContainer,
  type FieldConfig,
} from "@/components/dialogs/slideOver/SlideOverFormContainer";

export default function servicePointListingContainer() {
  const [searchQuery, setSearchQuery] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const { t } = useTranslation();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const addFields: FieldConfig[] = [
    // 1) TEXT
    {
      name: "full_name",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.FULL_NAME),
      type: "text",
      placeholder: t(LOCALIZATION_KEYS.FORM_FIELDS.PLACEHOLDERS.FULL_NAME),
    },

    // 2) NUMBER
    {
      name: "meter_reading",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.METER_READING),
      type: "number",
      placeholder: t(LOCALIZATION_KEYS.FORM_FIELDS.PLACEHOLDERS.METER_READING),
    },

    // 3) SINGLE SELECT
    {
      name: "category",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.CATEGORY),
      type: "select",
      placeholder: t(LOCALIZATION_KEYS.FORM_FIELDS.PLACEHOLDERS.CATEGORY),
      defaultValue: "RES",
      options: [
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.RESIDENTIAL),
          value: "RES",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.COMMERCIAL),
          value: "COM",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.INDUSTRIAL),
          value: "IND",
        },
      ],
    },

    // 4) MULTI-SELECT
    {
      name: "services",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.SERVICES_REQUIRED),
      type: "multi-select",
      placeholder: t(LOCALIZATION_KEYS.FORM_FIELDS.PLACEHOLDERS.SERVICES),
      options: [
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.ELECTRICITY),
          value: "ELEC",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.WATER),
          value: "WATER",
        },
        { label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.GAS), value: "GAS" },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.SOLAR),
          value: "SOLAR",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.INTERNET),
          value: "INTERNET",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.CABLE_TV),
          value: "CABLE_TV",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.FIBER),
          value: "FIBER",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.SEWAGE),
          value: "SEWAGE",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.TRASH),
          value: "TRASH",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.HEATING),
          value: "HEATING",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.COOLING),
          value: "COOLING",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.LANDLINE),
          value: "LANDLINE",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.GENERATOR),
          value: "GENERATOR",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.RAINWATER),
          value: "RAINWATER",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.RO_WATER),
          value: "RO_WATER",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.IRRIGATION),
          value: "IRRIGATION",
        },
        { label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.WIND), value: "WIND" },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.BIOFUEL),
          value: "BIOFUEL",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.SMART_METER),
          value: "SMART_METER",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.SECURITY),
          value: "SECURITY",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.FIRE_SAFETY),
          value: "FIRE_SAFETY",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.EV_CHARGING),
          value: "EV_CHARGING",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.STREET_LIGHT),
          value: "STREET_LIGHT",
        },
      ],
    },

    // 5) CHIP SELECT

    {
      name: "tags",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.TAGS),
      type: "chip-select",
      placeholder: t(LOCALIZATION_KEYS.FORM_FIELDS.PLACEHOLDERS.TAGS),
      options: [
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.URGENT),
          value: "urgent",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.VIP),
          value: "vip",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.NEW),
          value: "new",
        },
        {
          label: t(LOCALIZATION_KEYS.FORM_FIELDS.OPTIONS.FOLLOW_UP),
          value: "follow",
        },
      ],
    },

    // 6) TEXTAREA
    {
      name: "description",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.DESCRIPTION),
      type: "textarea",
      placeholder: t(LOCALIZATION_KEYS.FORM_FIELDS.PLACEHOLDERS.DESCRIPTION),
    },

    // 7) DATE
    {
      name: "start_date",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.START_DATE),
      type: "date",
    },

    // 8) SWITCH
    {
      name: "is_active",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.IS_ACTIVE),
      type: "switch",
      defaultValue: true,
    },

    // 9) CHECKBOX
    {
      name: "agree_terms",
      label: t(LOCALIZATION_KEYS.FORM_FIELDS.AGREE_TERMS),
      type: "checkbox",
      defaultValue: false,
    },
  ];

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
        </div>

        <div className="bg-accent py-4 xl:h-[75vh] 2xl:h-[86vh]">
          <TableLayout
            columns={columns}
            fetchData={fetchLeads}
            showSettingButton
            showAddButton
            showDownloadButton
            headerTitle={LOCALIZATION_KEYS.NAV.SERVICE_POINTS}
            className="max-h-[60vh] 2xl:max-h-[75vh]"
            externalSearch={searchQuery}
            onRowClick={() => navigate(`/users/service_points/details`)}
            onAddClick={() => setOpenAdd(true)}
          />
        </div>
      </div>
      <SlideOverFormContainer
        open={openAdd}
        onClose={() => setOpenAdd(false)}
       title={t(LOCALIZATION_KEYS.FORM_HEADERS.ADD_SERVICE_POINT)}
        fields={addFields}
        onSubmit={(data) => {
          console.log("SUBMITTED:", data);
          setOpenAdd(false);
        }}
      />
    </>
  );
}
