import DataTableContainer from "@/components/dataManagement/dataTable/DataTableContainer";
import type { Column } from "@/components/dataManagement/dataTable/DataTableView";
import { LOCALIZATION_KEYS } from "@/i18n/keys";

import {
  mockParameters,
  mockServicePointGroups,
  mockLinkedAccounts,
  mockConsumers,
} from "@/pages/admin/users/servicePoints/mockData";

type ParameterRow = {
  name: string;
  value: string;
  startDate: string;
  endDate: string;
  status: string;
  uploadedBy: string;
  reason: string;
};

type GroupRow = {
  udcid: string;
  groupName: string;
  type: string;
  subtype: string;
  status: string;
  startDate: string;
  endDate: string;
};

type LinkedAccountRow = {
  accountId: string;
  rateSchedule: string;
  billingCycle: string;
  relationship: string;
  effectivePeriod: string;
  status: string;
};

type ConsumerRow = {
  name: string;
  account: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
};

const getStatusStyles = (status: string) => {
  if (status?.toLowerCase() === "history") {
    return {
      bg: "bg-[#e4e7ec]",
      border: "border-[#98a2b3]",
      text: "text-[#667085]",
    };
  }

  return {
    bg: "bg-[#ecfdf3]",
    border: "border-[#039855]",
    text: "text-[#039855]",
  };
};

export const parametersColumns: Column<ParameterRow>[] = [
  { key: "name", label: LOCALIZATION_KEYS.DETAILS_COLS.PARAMETERS.NAME, visible: true },
  { key: "value", label: LOCALIZATION_KEYS.DETAILS_COLS.PARAMETERS.VALUE, visible: true },
  { key: "startDate", label: LOCALIZATION_KEYS.DETAILS_COLS.PARAMETERS.START_DATE, visible: true },
  { key: "endDate", label: LOCALIZATION_KEYS.DETAILS_COLS.PARAMETERS.END_DATE, visible: true },
  {
    key: "status",
    label: LOCALIZATION_KEYS.DETAILS_COLS.PARAMETERS.STATUS,
    visible: true,
    transformer: (value: any) => {
      const statusValue = value || "-";
      const colors = getStatusStyles(statusValue);
      return {
        type: "single-chip",
        value: statusValue,
        jsx: (
          <div className="flex items-center ">
            <span
              className={`px-3 py-1 rounded-full text-sm border ${colors.bg} ${colors.border} ${colors.text}`}
            >
              {statusValue}
            </span>
          </div>
        ),
      };
    },
  },
  { key: "uploadedBy", label: LOCALIZATION_KEYS.DETAILS_COLS.PARAMETERS.UPLOADED_BY, visible: true },
  { key: "reason", label:LOCALIZATION_KEYS.DETAILS_COLS.PARAMETERS.REASON, visible: true },
];

export const groupsColumns: Column<GroupRow>[] = [
  { key: "udcid", label: LOCALIZATION_KEYS.DETAILS_COLS.SERVICE_GROUPS.UCDID, visible: true },
  { key: "groupName", label: LOCALIZATION_KEYS.DETAILS_COLS.SERVICE_GROUPS.GROUP_NAME, visible: true },
  { key: "type", label: LOCALIZATION_KEYS.DETAILS_COLS.SERVICE_GROUPS.TYPE, visible: true },
  { key: "subtype", label:LOCALIZATION_KEYS.DETAILS_COLS.SERVICE_GROUPS.SUBTYPE, visible: true },
  {
    key: "status",
    label: LOCALIZATION_KEYS.DETAILS_COLS.SERVICE_GROUPS.STATUS,
    visible: true,
    transformer: (value: any) => {
      const statusValue = value || "-";
      const colors = getStatusStyles(statusValue);
      return {
        type: "single-chip",
        value: statusValue,
        jsx: (
          <div className="flex items-center ">
            <span
              className={`px-3 py-1 rounded-full text-sm border ${colors.bg} ${colors.border} ${colors.text}`}
            >
              {statusValue}
            </span>
          </div>
        ),
      };
    },
  },
  { key: "startDate", label:LOCALIZATION_KEYS.DETAILS_COLS.SERVICE_GROUPS.START_DATE, visible: true },
  { key: "endDate", label:LOCALIZATION_KEYS.DETAILS_COLS.SERVICE_GROUPS.END_DATE, visible: true },
];

export const linkedAccountsColumns: Column<LinkedAccountRow>[] = [
  { key: "accountId", label: LOCALIZATION_KEYS.DETAILS_COLS.LINKED_ACCOUNTS.ACCOUNT_ID, visible: true },
  { key: "rateSchedule", label: LOCALIZATION_KEYS.DETAILS_COLS.LINKED_ACCOUNTS.RATE_SCHEDULE, visible: true },
  { key: "billingCycle", label:  LOCALIZATION_KEYS.DETAILS_COLS.LINKED_ACCOUNTS.BILLING_CYCLE, visible: true },
  { key: "relationship", label:  LOCALIZATION_KEYS.DETAILS_COLS.LINKED_ACCOUNTS.RELATIONSHIP, visible: true },
  { key: "effectivePeriod", label:  LOCALIZATION_KEYS.DETAILS_COLS.LINKED_ACCOUNTS.EFFECTIVE_PERIOD, visible: true },
  {
    key: "status",
    label: "Status",
    visible: true,
    transformer: (value: any) => {
      const statusValue = value || "-";
      const colors = getStatusStyles(statusValue);
      return {
        type: "single-chip",
        value: statusValue,
        jsx: (
          <div className="flex items-center ">
            <span
              className={`px-3 py-1 rounded-full text-sm border ${colors.bg} ${colors.border} ${colors.text}`}
            >
              {statusValue}
            </span>
          </div>
        ),
      };
    },
  },
];

export const consumersColumns: Column<ConsumerRow>[] = [
  { key: "name", label: LOCALIZATION_KEYS.DETAILS_COLS.CONSUMERS.NAME, visible: true },
  { key: "account", label:LOCALIZATION_KEYS.DETAILS_COLS.CONSUMERS.ACCOUNT, visible: true },
  { key: "type", label:LOCALIZATION_KEYS.DETAILS_COLS.CONSUMERS.TYPE, visible: true },
  { key: "startDate", label:LOCALIZATION_KEYS.DETAILS_COLS.CONSUMERS.START_DATE, visible: true },
  { key: "endDate", label:LOCALIZATION_KEYS.DETAILS_COLS.CONSUMERS.END_DATE, visible: true },
  {
    key: "status",
    label:LOCALIZATION_KEYS.DETAILS_COLS.CONSUMERS.STATUS,
    visible: true,
    transformer: (value: any) => {
      const statusValue = value || "-";
      const colors = getStatusStyles(statusValue);
      return {
        type: "single-chip",
        value: statusValue,
        jsx: (
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm border ${colors.bg} ${colors.border} ${colors.text}`}
            >
              {statusValue}
            </span>
          </div>
        ),
      };
    },
  },
];

export default function DetailsTab() {
  return (
    <div className="space-y-6">
      <DataTableContainer
        data={mockParameters}
        columns={parametersColumns}
        headerTitle={LOCALIZATION_KEYS.SUMMARY_HEADERS.PARAMETERS}
        showSettingButton
        page={1}
        limit={50}
        total={mockParameters.length}
        totalPages={1}
        onSearch={() => {}}
        onPageChange={() => {}}
        containerClassName="max-h-[80vh]"
      />

      <DataTableContainer
        data={mockServicePointGroups}
        columns={groupsColumns}
        headerTitle={LOCALIZATION_KEYS.SUMMARY_HEADERS.SERVICE_POINT_GROUPS}
        showSettingButton
        page={1}
        limit={50}
        total={mockServicePointGroups.length}
        totalPages={1}
        onSearch={() => {}}
        onPageChange={() => {}}
      />

      <DataTableContainer
        data={mockLinkedAccounts}
        columns={linkedAccountsColumns}
        headerTitle={LOCALIZATION_KEYS.SUMMARY_HEADERS.LINKED_ACCOUNTS}
        showSettingButton
        page={1}
        limit={50}
        total={mockLinkedAccounts.length}
        totalPages={1}
        onSearch={() => {}}
        onPageChange={() => {}}
      />

      <DataTableContainer
        data={mockConsumers}
        columns={consumersColumns}
        headerTitle={LOCALIZATION_KEYS.SUMMARY_HEADERS.CONSUMERS}
        showSettingButton
        page={1}
        limit={50}
        total={mockConsumers.length}
        totalPages={1}
        onSearch={() => {}}
        onPageChange={() => {}}
      />
    </div>
  );
}


