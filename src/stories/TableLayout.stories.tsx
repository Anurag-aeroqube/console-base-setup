import type { Meta, StoryObj } from "@storybook/react";
import TableLayout from "@/components/layout/TableLayout";
import type { Column } from "@/components/dataManagement/dataTable/DataTableView";

// Sample 10 records
const mockData = [
  { id: 1, name: "Anurag", city: "Delhi", stage: "New", sales_person: "Rahul", phone: "999111" },
  { id: 2, name: "Amit", city: "Mumbai", stage: "Qualified", sales_person: "Amit", phone: "999222" },
  { id: 3, name: "Priya", city: "Noida", stage: "Won", sales_person: "Priya", phone: "999333" },
  { id: 4, name: "Suresh", city: "Delhi", stage: "New", sales_person: "Rahul", phone: "999444" },
  { id: 5, name: "Karan", city: "Mumbai", stage: "Qualified", sales_person: "Amit", phone: "999555" },
  { id: 6, name: "Pooja", city: "Noida", stage: "Won", sales_person: "Priya", phone: "999666" },
  { id: 7, name: "Riya", city: "Delhi", stage: "New", sales_person: "Rahul", phone: "999777" },
  { id: 8, name: "Vikas", city: "Mumbai", stage: "Qualified", sales_person: "Amit", phone: "999888" },
  { id: 9, name: "Sanjana", city: "Noida", stage: "Won", sales_person: "Priya", phone: "999999" },
  { id: 10, name: "Customer Test", city: "Delhi", stage: "New", sales_person: "Rahul", phone: "777777" },
    { id: 4, name: "Suresh", city: "Delhi", stage: "New", sales_person: "Rahul", phone: "999444" },
];


const mockFetchData = async ({ page, limit, search }: any) => {
  const q = search?.toLowerCase() ?? "";

  const filtered = q
    ? mockData.filter((x) => x.name.toLowerCase().includes(q))
    : mockData;

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    data: paginated,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
  };
};

const columns: Column<Record<string, any>>[] = [
  { key: "name", label: "Name", visible: true },
  { key: "city", label: "City", visible: true },
  { key: "stage", label: "Stage", visible: true },
  { key: "sales_person", label: "Sales Person", visible: true },
  { key: "phone", label: "Phone", visible: true },
];

const meta: Meta<typeof TableLayout> = {
  title: "Components/TableLayout",
  component: TableLayout,
  tags: ["autodocs"],
  args: {
    columns,
    fetchData: mockFetchData,
    className: "max-h-[70vh]",
  },
};

export default meta;
type Story = StoryObj<typeof TableLayout>;

export const Default: Story = {
  args: {
    externalSearch: "",

    columns: [{
      "key": "name",
      "label": "Name1",
      "visible": true
    }, {
      "key": "city",
      "label": "City",
      "visible": true
    }, {
      "key": "stage",
      "label": "Stage",
      "visible": true
    }, {
      "key": "sales_person",
      "label": "Sales Person",
      "visible": true
    }, {
      "key": "phone",
      "label": "Phone",
      "visible": true
    }]
  },
};

export const WithSearch: Story = {
  args: {
    externalSearch: "priya",
  },
};
