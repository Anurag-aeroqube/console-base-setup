// SummaryTab/mockData.ts
import type { Column } from "@/components/dataManagement/dataTable/DataTableView";
import { LOCALIZATION_KEYS } from "@/i18n/keys";

export const mockSummaryTables = {
  activeChannels: [
    { measurement: "809", type: "Interval Data", lastRead: "2025-10-16 12:45 PM", value: "1,7654", status: "VAL" },
    { measurement: "801", type: "Register", lastRead: "2025-10-16 12:45 PM", value: "57654.86", status: "VAL" },
    { measurement: "802", type: "Usage", lastRead: "2025-10-16 12:45 PM", value: "1897.45", status: "VAL" }
  ],
  billingRequests: [
    { ref: "809", from: "2025-10-16 12:45 PM", to: "2025-10-16 12:45 PM", cycle: "—", status: "Export_Hold", error: "0" },
    { ref: "801", from: "2025-10-16 12:45 PM", to: "2025-10-16 12:45 PM", cycle: "—", status: "Export_Hold", error: "0" }
  ],
  activeDataServices: [
    { ref: "809", name: "Event Transfer Service", type: "Event Processing", start: "2025-10-16 12:45 PM", end: "2025-10-17 10:30 PM" },
    { ref: "801", name: "Daily Data Collection Service", type: "Collection", start: "2025-10-16 12:45 PM", end: "2025-10-18 10:45 PM" },
    { ref: "802", name: "Residential DDS Service - Electric", type: "Delivery (DDS)", start: "2025-10-16 12:45 PM", end: "2025-10-16 12:45 PM" },
    { ref: "814", name: "Framing Service - Electric", type: "Framing", start: "2025-10-16 12:45 PM", end: "2025-10-16 12:45 PM" },
    { ref: "820", name: "Residential VEE Service - Electric", type: "Validation (VEE)", start: "2025-10-16 12:45 PM", end: "2025-10-16 12:45 PM" },
    { ref: "807", name: "Residential DTS Service - Electric", type: "Transformation", start: "2025-10-16 12:45 PM", end: "2025-10-16 12:45 PM" },
  ],
  recentEvents: [
    { ref: "EVT-9001", event: "Power Failure (Last Gasp)", time: "2025-10-16 12:45 PM", severity: "Critical", source: "Meter (MTR-10053)", status: "Active" },
    { ref: "EVT-9002", event: "Low Voltage (Sags) Detected", time: "2025-10-16 12:45 PM", severity: "Warning", source: "Meter (MTR-10053)", status: "Cleared" }
  ]
};

export const channelsColumns: Column<any>[] = [
  { key: "measurement", label: LOCALIZATION_KEYS.SUMMARY_COLS.MEASUREMENT, visible: true },
  { key: "type", label: LOCALIZATION_KEYS.SUMMARY_COLS.TYPE, visible: true },
  { key: "lastRead", label: LOCALIZATION_KEYS.SUMMARY_COLS.LAST_READ, visible: true },
  { key: "value", label: LOCALIZATION_KEYS.SUMMARY_COLS.VALUE, visible: true },
  { key: "status", label: LOCALIZATION_KEYS.SUMMARY_COLS.STATUS, visible: true },
];


export const billingColumns: Column<any>[] = [
  { key: "ref", label: LOCALIZATION_KEYS.SUMMARY_COLS.REF, visible: true },
  { key: "from", label: LOCALIZATION_KEYS.SUMMARY_COLS.FROM, visible: true },
  { key: "to", label: LOCALIZATION_KEYS.SUMMARY_COLS.TO, visible: true },
  { key: "cycle", label: LOCALIZATION_KEYS.SUMMARY_COLS.CYCLE, visible: true },
  { key: "status", label: LOCALIZATION_KEYS.SUMMARY_COLS.STATUS, visible: true },
  { key: "error", label: LOCALIZATION_KEYS.SUMMARY_COLS.ERROR, visible: true },
];


export const servicesColumns: Column<any>[] = [
  { key: "ref", label: LOCALIZATION_KEYS.SUMMARY_COLS.REF, visible: true },
  { key: "name", label: LOCALIZATION_KEYS.SUMMARY_COLS.NAME, visible: true },
  { key: "type", label: LOCALIZATION_KEYS.SUMMARY_COLS.TYPE, visible: true },
  { key: "start", label: LOCALIZATION_KEYS.SUMMARY_COLS.START, visible: true },
  { key: "end", label: LOCALIZATION_KEYS.SUMMARY_COLS.END, visible: true },
];


export const eventsColumns: Column<any>[] = [
  { key: "ref", label: LOCALIZATION_KEYS.SUMMARY_COLS.REF, visible: true },
  { key: "event", label: LOCALIZATION_KEYS.SUMMARY_COLS.EVENT, visible: true },
  { key: "time", label: LOCALIZATION_KEYS.SUMMARY_COLS.TIME, visible: true },
  { key: "severity", label: LOCALIZATION_KEYS.SUMMARY_COLS.SEVERITY, visible: true },
  { key: "source", label: LOCALIZATION_KEYS.SUMMARY_COLS.SOURCE, visible: true },
  { key: "status", label: LOCALIZATION_KEYS.SUMMARY_COLS.STATUS, visible: true },
];


export const mockServiceRequests = [
  {
    type: "Meter Service",
    status: "Open",
    description: "Check Meter Configuration",
    id: "#1578435"
  },
  {
    type: "Meter Service",
    status: "Done",
    description: "On Demand Read",
    id: "#1578435"
  },
  {
    type: "Billing",
    status: "Done",
    description: "Check Meter Billing",
    id: "#1578435"
  },
  {
    type: "Field Service",
    status: "Done",
    description: "Meter Investigation",
    id: "#1578435"
  }
];
export const mockTabs = [
  { key: "summary", label: LOCALIZATION_KEYS.TABS.SUMMARY },
  { key: "details", label: LOCALIZATION_KEYS.TABS.DETAILS },
];


// ---------------- PARAMETERS ----------------
export const mockParameters = [
  {
    name: "Sanctioned Load",
    value: "5.00 kW",
    startDate: "05-Jun-2025",
    endDate: "-",
    status: "Active",
    uploadedBy: "System Admin",
    reason: "New Connection"
  },
  {
    name: "Supply Voltage",
    value: "230 V (Single Phase)",
    startDate: "18-Jul-2025",
    endDate: "-",
    status: "Active",
    uploadedBy: "Field Crew",
    reason: "Meter Install"
  },
  {
    name: "Phase Configuration",
    value: "1 Phase, 2 Wire",
    startDate: "18-Jul-2025",
    endDate: "-",
    status: "Active",
    uploadedBy: "Field Crew",
    reason: "Meter Install"
  },
  {
    name: "Frequency",
    value: "50 Hz",
    startDate: "-",
    endDate: "-",
    status: "Active",
    uploadedBy: "System (Auto)",
    reason: "Default Std"
  },
  {
    name: "Rate Category",
    value: "LT/BS Domestic (Tier 1)",
    startDate: "24-Jul-2025",
    endDate: "14-Aug-2025",
    status: "Active",
    uploadedBy: "Billing Dept",
    reason: "Tariff Update"
  },
  {
    name: "Connection Type",
    value: "Permanent: Direct",
    startDate: "24-Jul-2025",
    endDate: "24-Aug-2025",
    status: "Active",
    uploadedBy: "System Admin",
    reason: "Load Enhancement"
  },
  {
    name: "Metering Mode",
    value: "Bi-Directional (Net Meter)",
    startDate: "28-Jul-2025",
    endDate: "24-Aug-2025",
    status: "History",
    uploadedBy: "System Admin",
    reason: "Load Enhancement"
  }
];

// ---------------- SERVICE POINT GROUPS ----------------
export const mockServicePointGroups = [
  {
    udcid: "GRP-BLG-03",
    groupName: "Billing Cycle 03 - Residential",
    type: "Billing",
    subtype: "Monthly Cycle",
    status: "Active",
    startDate: "2025-06-05",
    endDate: "2025-06-05"
  },
  {
    udcid: "GRP-ROUTE-512",
    groupName: "South Delhi Route 12",
    type: "Operations",
    subtype: "Meter Reading Route",
    status: "Active",
    startDate: "2025-06-05",
    endDate: "2025-06-05"
  },
  {
    udcid: "GRP-TR-900",
    groupName: "Transformer Zone TF-900",
    type: "Network",
    subtype: "Outage Block",
    status: "Active",
    startDate: "2025-06-05",
    endDate: "2025-06-05"
  },
  {
    udcid: "GRP-GO-PL-01",
    groupName: "Net Metering Pilot Phase 1",
    type: "Program",
    subtype: "Green Energy Scheme",
    status: "Active",
    startDate: "2025-06-05",
    endDate: "2025-06-05"
  },
  {
    udcid: "GRP-VP-01",
    groupName: "Critical Infrastructure / Priority",
    type: "Priority",
    subtype: "Load Shedding Exempt",
    status: "Active",
    startDate: "2025-06-05",
    endDate: "2025-06-05"
  }
];

// ---------------- LINKED ACCOUNTS ----------------
export const mockLinkedAccounts = [
  {
    accountId: "ACCT-10053",
    rateSchedule: "RES-STD-01 (Residential Standard)",
    billingCycle: "Monthly - Cycle 05",
    relationship: "Primary Payer",
    effectivePeriod: "01 Jun 2025 - Present",
    status: "Active"
  },
  {
    accountId: "ACCT-19872",
    rateSchedule: "RES-TOU-4 (Time of Use)",
    billingCycle: "Monthly - Cycle 05",
    relationship: "Primary Payer",
    effectivePeriod: "12 Jan 2022 - 08 Jan 2025",
    status: "Active"
  },
  {
    accountId: "ACCT-88542",
    rateSchedule: "RES-FIXED (Flat Rate)",
    billingCycle: "Bi-Monthly - Cycle 02",
    relationship: "Landlord / Owner",
    effectivePeriod: "15 Mar 2020 - 11 Jan 2023",
    status: "Active"
  }
];

// ---------------- CONSUMERS ----------------
export const mockConsumers = [
  {
    name: "Mayank Raj",
    account: "ACCT-10053",
    type: "Primary Owner",
    startDate: "2025-10-16 12:45 PM",
    endDate: "2025-10-18 12:45 PM",
    status: "Active"
  },
  {
    name: "Ritika Raheja",
    account: "ACCT-19872",
    type: "Sub User",
    startDate: "2025-10-16 12:45 PM",
    endDate: "2025-10-16 12:45 PM",
    status: "Active"
  },
  {
    name: "Anurag Mishra",
    account: "ACCT-10055",
    type: "Sub User",
    startDate: "2025-10-16 12:45 PM",
    endDate: "2025-10-16 12:45 PM",
    status: "Active"
  }
];
