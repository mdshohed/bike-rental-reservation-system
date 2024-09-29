import { useGetAllBikesQuery } from "@/redux/features/bikes/bikesApi";
import { TBike } from "@/utils";
import { Select, Spin } from "antd";
import { useEffect, useState } from "react";

type TSelectType = {
  value: string;
  label: string;
};

const CompareBox = ({ id }: { id: string }) => {
  const { data: bikes, isLoading, error } = useGetAllBikesQuery(null);
  const [selectOptions, setSelectOptions] = useState<TSelectType[]>([]);
  const [selectedBike1, setSelectedBike1] = useState<TBike | null>(null);
  const [selectedBike2, setSelectedBike2] = useState<TBike | null>(null);

  useEffect(() => {
    if (bikes?.data && bikes) {
      const transformBikes = bikes?.data?.map((item: TBike) => ({
        value: item.name,
        label: item.name,
      }));
      setSelectOptions(transformBikes || []);
      const defaultBike = bikes?.data.find( (item:TBike)=>item._id==id)
      console.log("data", defaultBike);
      
      setSelectedBike1(defaultBike)
    }
  }, [bikes, id]);

  const handleSelectBike1 = (value: string) => {
    const bike1 = bikes?.data?.find((bike: TBike) => bike.name === value);
    setSelectedBike1(bike1 || null);
  };

  const handleSelectBike2 = (value: string) => {
    const bike2 = bikes?.data?.find((bike: TBike) => bike.name === value);
    setSelectedBike2(bike2 || null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Compare Bikes</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">Error fetching bikes.</div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <Select
                showSearch
                placeholder="Select a bike"
                value={selectedBike1?.name}
                optionFilterProp="label"
                onChange={handleSelectBike1}
                options={selectOptions}
                className="w-1/2 mx-2"
              />
              <Select
                showSearch
                placeholder="Select a bike"
                optionFilterProp="label"
                onChange={handleSelectBike2}
                options={selectOptions}
                className="w-1/2 mx-2"
              />
            </div>

            <table className="w-full bg-gray-50 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-left">Bike 1</th>
                  <th className="p-4 text-left">Bike 2</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-medium">Name</td>
                  <td className="p-4">{selectedBike1?.name || "N/A"}</td>
                  <td className="p-4">{selectedBike2?.name || "N/A"}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Model</td>
                  <td className="p-4">{selectedBike1?.model || "N/A"}</td>
                  <td className="p-4">{selectedBike2?.model || "N/A"}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Brand</td>
                  <td className="p-4">{selectedBike1?.brand || "N/A"}</td>
                  <td className="p-4">{selectedBike2?.brand || "N/A"}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Year</td>
                  <td className="p-4">{selectedBike1?.year || "N/A"}</td>
                  <td className="p-4">{selectedBike2?.year || "N/A"}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Cost</td>
                  <td className="p-4">${selectedBike1?.pricePerHour || "0"}</td>
                  <td className="p-4">${selectedBike2?.pricePerHour || "0"}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Description</td>
                  <td className="p-4">{selectedBike1?.description || "N/A"}</td>
                  <td className="p-4">{selectedBike2?.description || "N/A"}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareBox;
