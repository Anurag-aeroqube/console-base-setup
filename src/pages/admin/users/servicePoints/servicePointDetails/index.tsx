import { useState } from "react";
import { Button } from "@/components/ui/button";

import SummaryTab from "./summaryTab/SummaryTabContainer";
import DetailsTab from "./detailsTab/DetailsTabContainer";

import { mockTabs } from "../mockData";
import { useTranslation } from "react-i18next";
import { LOCALIZATION_KEYS } from "@/i18n/keys";

const mockServicePoint = {
  servicePointId: "SDP-10053",
  meterId: "MTR-10053",
  meterType: "Electric",
  summary: {
    account: {
      accountUdccid: "ACCT-10053",
      accountStart: "2025-06-05",
      billingCycle: "Monthly",
    },
    customer: {
      primaryContact: "+91 8178578640",
      address: "1002, Aurobindo Marg, New Delhi",
    },
    meterStatus: {
      ctptMultiplier: "1.0",
      powerConnected: "Connected",
      loadConnected: "Not Connected",
    },
  },
};

export default function ServicePointDetails() {
  const [activeTab, setActiveTab] = useState<string>(mockTabs[0].key);
  const { t } = useTranslation();
  const data = mockServicePoint;

  return (
    <div className="p-4 space-y-4 bg-accent ">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold gap-4 flex">
          <div className="space-x-2">
            <span>{t(LOCALIZATION_KEYS.NAV.SERVICE_POINTS)}</span>
            <span>{data.servicePointId}</span>
          </div>
          <div className="space-x-2">
            <span>{t(LOCALIZATION_KEYS.SUMMARY_FIELDS.METER)}</span>
            <span>{data.meterId}</span>
          </div>
          <span >
            {" "}
            {t(LOCALIZATION_KEYS.SUMMARY_FIELDS.ELECTRIC || data.meterType)}
          </span>
        </h1>

        <Button className="border bg-primary text-background">Actions ▾</Button>
      </div>

      {/* TABS */}
      <div className="inline-flex  border overflow-hidden">
        {mockTabs.map((tab) => (
          <Button
            key={tab.key}
            size="lg"
            variant="default"
            onClick={() => setActiveTab(tab.key)}
            className={`
        px-10 py-2 text-sm cursor-pointer font-medium transition-colors
        ${
          activeTab === tab.key
            ? "bg-primary text-background"
            : "bg-background text-foreground"
        }
      `}
          >
            {t(tab.label)}
          </Button>
        ))}
      </div>
      {activeTab === "summary" && <SummaryTab data={data.summary} />}
      {activeTab === "details" && <DetailsTab />}

      {/* Placeholder UI for new tabs */}
      {activeTab === "serviceRequests" && (
        <div className="p-4">Service Requests Coming Soon...</div>
      )}

      {activeTab === "events" && (
        <div className="p-4">Events Tab Coming Soon...</div>
      )}

      {activeTab === "billingHistory" && (
        <div className="p-4">Billing History Coming Soon...</div>
      )}
    </div>
  );
}
