import BikeCard1 from "@/components/BikeManagement/BikeCard1";
import BikeCard2 from "@/components/BikeManagement/BikeCard2";
import AnimatedBackground from "@/components/core/animated-background";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikesApi";
import { TBike } from "@/utils";
import { useState } from "react";

const AvailableBikes = () => {
  const { data: bikes, isLoading, error } = useGetAllBikesQuery(null);
  const [cardMode, setCardMode] = useState("list");

  return (
    <div className="max-w-7xl mx-auto px-[5%] my-10">
      <div className="py-5 text-center">
        <p className="text-xl sm:text-3xl font-semibold">Featured Bikes</p>
        <p className="text-md sm:text-lg py-2">
          Rent a bike any where in the Bangladesh
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatedBackground
          className="rounded-md bg-gray-200 z-10"
          transition={{
            type: "spring",
            bounce: 0.1,
            duration: 0.6,
          }}
          enableHover
        >
          {bikes?.data?.map((item: TBike, index: number) => (
            <div key={index} data-id={`card-${index}`} className="mx-auto">
              <BikeCard2 item={item}></BikeCard2>
            </div>
          ))}
        </AnimatedBackground>
      </div>

      
    </div>
  );
};

export default AvailableBikes;
