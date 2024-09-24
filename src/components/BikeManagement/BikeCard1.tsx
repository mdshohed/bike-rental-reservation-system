import { TBike } from "@/utils";
import { Navigate, useNavigate } from "react-router-dom";

const BikeCard1 = ({item}: {item: TBike}) => {
  const navigate = useNavigate(); 
  const handleNavigate = (id: string) =>{
    navigate(`/bike-management/${id}`)
    // return <Navigate to={`/bike-management/${id}`}></Navigate>
  }

  
  return (
    <div className="border-r border-b border-l dark:text-white border-gray-400 lg:border-t lg:border-gray-400 bg-white dark:bg-gray-700 rounded-b-lg lg:rounded-b-lg lg:rounded-r flex flex-col justify-between leading-normal">
      <img
        src="https://i0.wp.com/tvsabl.com/wp-content/uploads/2022/03/1-1.jpg?resize=825%2C483&ssl=1"
        className="w-full mb-3"
      />
      <div className="p-4 pt-2">
        <div className="mb-2">
          <p
            className=" font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
          >{item.name}
          </p>
          <p className=" text-sm">
            {item.description}
          </p>
        </div>
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
        <div>
          <button onClick={()=>handleNavigate(item._id ? item._id : '')} className="pb-2 pt-6 cursor-pointer flex justify-center items-center relative">
            <div className="absolute flex justify-center items-center inset-0  rounded-lg" />
              <div className="px-5 py-2 whitespace-nowrap bg-gray-200 text-black rounded-[6px]  relative  hover:transition hover:duration-1000  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 ">
              View More - (${item.pricePerHour.toFixed(2)}/perHours)
            </div>
          </button>
          {/* <button>View More - {item.pricePerHour}/perHours</button> */}
        </div>
      </div>
    </div>
  );
};

export default BikeCard1;
