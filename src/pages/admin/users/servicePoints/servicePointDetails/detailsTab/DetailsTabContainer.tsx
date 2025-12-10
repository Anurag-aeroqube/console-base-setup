import DataTableContainer from "@/components/dataManagement/dataTable/DataTableContainer";
import type { Column } from "@/components/dataManagement/dataTable/DataTableView";

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
  { key: "name", label: "Name", visible: true },
  { key: "value", label: "Value", visible: true },
  { key: "startDate", label: "Start Date", visible: true },
  { key: "endDate", label: "End Date", visible: true },
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
  { key: "uploadedBy", label: "Uploaded By", visible: true },
  { key: "reason", label: "Reason", visible: true },
];

export const groupsColumns: Column<GroupRow>[] = [
  { key: "udcid", label: "UCDID", visible: true },
  { key: "groupName", label: "Group Name", visible: true },
  { key: "type", label: "Type", visible: true },
  { key: "subtype", label: "Subtype", visible: true },
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
  { key: "startDate", label: "Start Date", visible: true },
  { key: "endDate", label: "End Date", visible: true },
];

export const linkedAccountsColumns: Column<LinkedAccountRow>[] = [
  { key: "accountId", label: "Account ID", visible: true },
  { key: "rateSchedule", label: "Rate Schedule", visible: true },
  { key: "billingCycle", label: "Billing Cycle", visible: true },
  { key: "relationship", label: "Relationship", visible: true },
  { key: "effectivePeriod", label: "Effective Period", visible: true },
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
  { key: "name", label: "Consumer Name", visible: true },
  { key: "account", label: "Account", visible: true },
  { key: "type", label: "Type", visible: true },
  { key: "startDate", label: "Start Date", visible: true },
  { key: "endDate", label: "End Date", visible: true },
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
        headerTitle=" Parameters"
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
        headerTitle=" Service Point Groups"
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
        headerTitle="Linked Accounts"
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
        headerTitle="Consumers"
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


