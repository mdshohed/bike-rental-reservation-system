import BikeCard1 from "@/components/BikeManagement/BikeCard1";
import BikeCard2 from "@/components/BikeManagement/BikeCard2";
import AnimatedBackground from "@/components/core/animated-background";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikesApi";
import { TBike } from "@/utils";
import { useEffect, useState } from "react";
import SearchField from "../search/SearchField";
import { Empty } from "antd";

const AvailableBikes = () => {
  const { data, isLoading, error } = useGetAllBikesQuery(null);
  const [bikes, setBikes] = useState<TBike[]>([]);
  useEffect(() => {
    if (data?.data && data) {
      setBikes(data?.data)
    }
  }, [data]);
  const [cardMode, setCardMode] = useState("list");

  return (
    <div className="max-w-7xl mx-auto px-[5%] my-10">
      <div className="py-5 text-center">
        <p className="text-xl sm:text-3xl font-semibold">Featured Bikes</p>
        <p className="text-md sm:text-lg py-2">
          Rent a bike any where in the Bangladesh
        </p>
      </div>
      <SearchField></SearchField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bikes && bikes.length === 0 ? (
          <div className="min-h-[300px] flex justify-center items-center">
            <Empty />
          </div>
        ) : (
          <AnimatedBackground
            className="rounded-md bg-gray-200 z-10"
            transition={{
              type: "spring",
              bounce: 0.1,
              duration: 0.6,
            }}
            enableHover
          >
            {bikes?.map((item: TBike, index: number) => (
              <div key={index} data-id={`card-${index}`} className="mx-auto">
                <BikeCard2 item={item} />
              </div>
            ))}
          </AnimatedBackground>
        )}
      </div>
    </div>
  );
};

export default AvailableBikes;
