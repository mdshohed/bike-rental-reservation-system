import BikeCard1 from "@/components/BikeManagement/BikeCard1";
import BikeCard2 from "@/components/BikeManagement/BikeCard2";
import AnimatedBackground from "@/components/core/animated-background";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikesApi";
import { TBike } from "@/utils";
import { useEffect, useState } from "react";
import SearchField from "../search/SearchField";
import { Empty } from "antd";
import GlobalLoader from "@/components/ui/loaders/GlobalLoader";

const AvailableBikes = () => {
  const { data, isLoading, error } = useGetAllBikesQuery(null);
  const [searchLoader, setSearLoader] = useState(false)
  const [bikes, setBikes] = useState<TBike[]>([]);
  useEffect(() => {
    if (data?.data && data) {
      setBikes(data?.data)
    }
  }, [data]);
  const [cardMode, setCardMode] = useState("list");
  
  const handleSearchBike = async(e: string) =>{
    setSearLoader(true);
   
    const newBikes = data?.data.filter( (item: TBike)=>item.name.toLowerCase().includes(e.toLowerCase().trim()));
    setBikes(newBikes); 
    await new Promise((resolve) => setTimeout(resolve, 100));
    setSearLoader(false) 
  }

  // if(isLoading||searchLoader){
  //   return <GlobalLoader></GlobalLoader>
  // }

  return (
    <div className="max-w-7xl mx-auto px-[5%] my-10">
      {/* {(isLoading||searchLoader) && <GlobalLoader></GlobalLoader>} */}
      <div className="py-5 text-center">
        <p className="text-xl sm:text-3xl font-semibold">Featured Bikes</p>
        <p className="text-md sm:text-lg py-2">
          Rent a bike any where in the Bangladesh
        </p>
      </div>
      {/* <SearchField></SearchField> */}
      <div className="parent flex flex-col sm:flex-row items-center max-w-xl mx-auto justify-center gap-y-4 sm:justify-between pr-2 sm:pr-1 sm:bg-white rounded-full mb-5 relative group transition-all duration-500 sm:border border-transparent sm:hover:border-indigo-600 focus-within:border-indigo-600">
        <input
          onChange={(e)=>handleSearchBike(e.target.value)}
          type="text"
          className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white text-gray-900 bg-transparent border-none rounded-full placeholder-gray-400 focus:outline-none leading-normal"
          placeholder="Enter A Bike name "
        />
        <button  className="py-3 px-6 max-sm:w-full  rounded-full bg-indigo-600 text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:bg-indigo-700 sm:absolute top-1.5 right-3">
          Search Bike
        </button>
      </div>

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
            {bikes?.slice(0,6).map((item: TBike, index: number) => (
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
