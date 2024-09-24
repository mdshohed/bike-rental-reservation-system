import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Rental = () => {
  return (
    <div className="mt-5">
      <Tabs
        defaultValue="unpaid"
        className="flex flex-col ms-0 sm:ms-14 justify-center items-center"
      >
        <TabsList>
          <TabsTrigger defaultChecked value="unpaid">
            Unpaid
          </TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        <TabsContent value="unpaid">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="paid">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Rental;
