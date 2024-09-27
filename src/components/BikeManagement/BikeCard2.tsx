import { TBike } from "@/utils";
import { useNavigate } from "react-router-dom";

const BikeCard2 = ({item, }: {item: TBike}) => {
  const navigate = useNavigate(); 
  const handleNavigate = (id: string) =>{
    navigate(`/bikes/${id}`)
    // return <Navigate to={`/bike-management/${id}`}></Navigate>
  }

  return (
    <div className="flex flex-col justify-center ">
      <div className="relative flex flex-col sm:flex-row sm:space-x-5 space-y-3 sm:space-y-0 rounded-md border dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-800 ">
        <div className="w-full sm:w-1/3  grid place-items-center">
          <img
            src="https://tvsabl.com/wp-content/uploads/2022/03/01-STRIKING-RED-1-e1648041783108.png"
            alt="tailwind logo"
            className="rounded-sm  max-h-60 "
          />
        </div>
        <div className="w-full sm:w-2/3  flex flex-col space-y-2 p-6 md:p-3">
          <h3 className="font-black text-gray-800 text-xl">
            {item.name}
          </h3>
          <p className=" text-gray-500 text-base">
           {item.description}
          </p>
          <div className="flex items-center text-md">
            <div className="flex-1 ">
              <p className="whitespace-nowrap ">brand: <span className="font-medium text-gray-900 dark:text-white">{item.brand}</span></p>
              <p className="whitespace-nowrap ">year: <span className="font-medium text-gray-900 dark:text-white">{item.year}</span></p>
            </div>
            <div className="flex-1">
              <p className="whitespace-nowrap ">model: <span className="font-medium text-gray-900 dark:text-white">{item.model}</span></p>
              <p className="whitespace-nowrap ">cc: <span className="font-medium text-gray-900 dark:text-white">{item.cc}</span></p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
               <p>Rental Price</p>
              <p><span className="text-green-500 font-semibold text-xl">${item.pricePerHour.toFixed(2)}</span>/perHours</p>
            </div>
           

            <button onClick={()=>handleNavigate(item._id ? item._id : '')} className="pb-2 pt-6 cursor-pointer flex justify-center items-center relative">
              <div className="absolute flex justify-center items-center inset-0  rounded-lg" />
                <div className="px-5 py-2 whitespace-nowrap bg-gray-200 text-black rounded-[6px]  relative  hover:transition hover:duration-1000  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 ">
                View More 
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
