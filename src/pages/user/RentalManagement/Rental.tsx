import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnpaidTable from "./UnpaidTable";
import PaidTable from "./PaidTable";

const Rental = () => {
  return (
    <div className="mt-5">
      <Tabs
        defaultValue="unpaid"
        className=""
      >
        <TabsList>
          <TabsTrigger defaultChecked value="unpaid">
            Unpaid
          </TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        <TabsContent value="unpaid">
          <UnpaidTable></UnpaidTable>
        </TabsContent>
        <TabsContent value="paid">
          <PaidTable></PaidTable>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rental;
