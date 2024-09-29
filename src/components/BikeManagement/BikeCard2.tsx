import { TBike } from "@/utils";
import { useNavigate } from "react-router-dom";

const BikeCard2 = ({item}: {item: TBike}) => {
  const navigate = useNavigate(); 
  const handleNavigate = (id: string) =>{
    navigate(`/bikes/${id}`)
    // return <Navigate to={`/bike-management/${id}`}></Navigate>
  }

  return (
    <div  className="flex flex-col justify-center ">
      <div className="relative flex flex-col sm:flex-row sm:space-x-5 space-y-3 sm:space-y-0 rounded-md border dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-800 ">
        <div className="w-full sm:w-1/3  grid place-items-center">
          <img
            src={item?.image ? item?.image : "https://tvsabl.com/wp-content/uploads/2022/03/01-STRIKING-RED-1-e1648041783108.png"}

            alt="tailwind logo"
            className="rounded-sm  max-h-60 "
          />
        </div>
        <div className="w-full sm:w-2/3  flex flex-col space-y-2 p-6 md:p-3">
          
          <div className="flex justify-between items-center">
            <h3 className="font-black text-gray-800 text-xl">
            {item.name}
          </h3>
          <p className="bg-[#bdf168] px-2 py-1 rounded-xl font-bold text-[16px]">${item.pricePerHour.toFixed(2)}/<span className="font-[12px] font-normal">hour</span></p>

          </div>
          <p className=" text-gray-500 text-base">
           {/* {item.description} */}
           {item.description.length > 30
              ? `${item.description.substring(0, 30)}...`
              : item.description}
          </p>
          <div className="flex items-center text-md">
            <div className="flex-1 ">
              <p className="whitespace-nowrap ">Brand: <span className="font-medium text-gray-900 dark:text-white">{item.brand}</span></p>
              <p className="whitespace-nowrap ">Year: <span className="font-medium text-gray-900 dark:text-white">{item.year}</span></p>
            </div>
            <div className="flex-1">
              <p className="whitespace-nowrap ">Model: <span className="font-medium text-gray-900 dark:text-white">{item.model}</span></p>
              <p className="whitespace-nowrap ">Engine: <span className="font-medium text-gray-900 dark:text-white">{item.cc}cc</span></p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            {/* <div>
              <p className="bg-[#bdf168] px-2 py-1 rounded-xl"><span className=" font-semibold text-[16px]">${item.pricePerHour.toFixed(2)}</span>/Hour</p>
            </div> */}
           

            <button onClick={()=>handleNavigate(item._id ? item._id : '')} className="pb-2 pt-6 cursor-pointer flex justify-center items-center relative">
              <div className="absolute flex justify-center items-center inset-0  rounded-lg" />
                <div className="px-5 group py-2 whitespace-nowrap bg-gray-200 text-black rounded-[6px]  relative  hover:transition hover:duration-1000  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 ">
                View More 
                {/* <span className="hidden group-hover:inline">{" >"}</span> */}

              </div>
            </button>
            {/* <button>View More - {item.pricePerHour}/perHours</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard2;
