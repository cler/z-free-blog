import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";

import data from "./data.json";

export default function Page() {
  return (
    <>
      <SectionCards />
      <DataTable data={data} />
    </>
  );
}
