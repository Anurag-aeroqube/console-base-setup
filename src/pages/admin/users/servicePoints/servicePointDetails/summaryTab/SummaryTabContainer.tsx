import DataTableContainer from "@/components/dataManagement/dataTable/DataTableContainer";
import {
  billingColumns,
  channelsColumns,
  eventsColumns,
  mockServiceRequests,
  mockSummaryTables,
  servicesColumns,
} from "@/pages/admin/users/servicePoints/mockData";
import SettingIcon from "@/assets/icons/settings.svg?react";

const statusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-[#f79009] border-orange-500";
    case "Done":
      return "bg-[#d1fadf] border-[#12b76a]";
    default:
      return "bg-gray-400 border-gray-400";
  }
};

export default function SummaryTab({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 bg-background border rounded-lg p-5">
        {/* ACCOUNT */}
        <div className="space-y-2 border-r ">
          <h3 className="font-semibold">Account</h3>
          <div className="space-x-2">
            <span className="text-muted-foreground">Account Udccid</span>{" "}
            <span className="font-medium">{data.account.accountUdccid}</span>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground">Account Start</span>{" "}
            <span className="font-medium">{data.account.accountStart}</span>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground">Billing Cycle</span>{" "}
            <span className="font-medium">{data.account.billingCycle}</span>
          </div>
        </div>

        {/* CUSTOMER */}
        <div className="space-y-2  border-r">
          <h3 className="font-semibold">Customer</h3>
          <div className="space-x-2">
            <span className="text-muted-foreground">Primary Contact</span>{" "}
            <span className="font-medium">{data.customer.primaryContact}</span>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground">Premise/Address</span>{" "}
            <span className="font-medium">{data.customer.address}</span>
          </div>
        </div>

        {/* METER STATUS */}
        <div className="space-y-2">
          <h3 className="font-semibold">Meter Status</h3>
          <div className="space-x-2">
            <span className="text-muted-foreground">Net CTPT Multiplier</span>{" "}
            <span className="font-medium">
              {" "}
              {data.meterStatus.ctptMultiplier}
            </span>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground">Power Connected</span>{" "}
            <span className="font-medium">
              {data.meterStatus.powerConnected}
            </span>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground">Load Connected</span>{" "}
            <span className="font-medium">
              {data.meterStatus.loadConnected}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/4 bg-background border rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-lg">Service Requests (547)</h2>
               <SettingIcon className="w-6 h-6 cursor-pointer" />

          </div>

          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
            {mockServiceRequests.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={`w-4 h-4 rounded-full border mt-1 ${statusColor(
                    item.status
                  )}`}
                ></div>

                <div className="flex flex-col">
                  <div className="font-semibold">
                    {item.type}{" "}
                    <span
                      className={
                        item.status === "Open"
                          ? "text-[#f79009]"
                          : "text-foreground"
                      }
                    >
                      - {item.status}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                  <div className="text-xs text-gray-500">{item.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4 space-y-6">
          <DataTableContainer
            data={mockSummaryTables.activeChannels}
            columns={channelsColumns}
            headerTitle="Active Channels (3)"
            showSettingButton
            onSearch={() => {}}
            onPageChange={() => {}}
            page={1}
            totalPages={1}
            total={mockSummaryTables.activeChannels.length}
            limit={10}
          />

          <DataTableContainer
            data={mockSummaryTables.billingRequests}
            columns={billingColumns}
            headerTitle="Recent Billing Requests (2)"
            showSettingButton
            onSearch={() => {}}
            onPageChange={() => {}}
            page={1}
            totalPages={1}
            total={mockSummaryTables.activeChannels.length}
            limit={10}
          />

          <DataTableContainer
            data={mockSummaryTables.activeDataServices}
            columns={servicesColumns}
            headerTitle=" Active Data Services (6)"
            showSettingButton
            onSearch={() => {}}
            onPageChange={() => {}}
            page={1}
            totalPages={1}
            total={mockSummaryTables.activeChannels.length}
            limit={10}
          />

          <DataTableContainer
            data={mockSummaryTables.recentEvents}
            columns={eventsColumns}
            headerTitle="Recent Events (2)"
            showSettingButton
            onSearch={() => {}}
            onPageChange={() => {}}
            page={1}
            totalPages={1}
            total={mockSummaryTables.activeChannels.length}
            limit={10}
          />
        </div>
      </div>
    </div>
  );
}
