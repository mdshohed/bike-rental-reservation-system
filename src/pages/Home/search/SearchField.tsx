// import GlobalLoader from "@/components/ui/loaders/GlobalLoader";
// import { useGetAllBikesQuery } from "@/redux/features/bikes/bikesApi";
// import { TBike } from "@/utils";
// import { Label } from "@headlessui/react";
// import { Select } from "antd";
// import { useEffect, useState } from "react";

// type TSelectType = {
//   value: string, 
//   label: string
// }
// type TYearSelectType = {
//   value: number, 
//   label: number
// }

const SearchField = () => {
  // const [models, setModels] = useState<TSelectType[]>([])
  // const [brands, setBrands] = useState<TSelectType[]>([])
  // const [years, setYears] = useState<TYearSelectType[]>([])

  // useEffect(()=>{
  //   if(bikes?.data && bikes){
  //     const allBrand = bikes?.data?.reduce((acc: TSelectType[], item: TBike) => {
  //       if (!acc.some(brand => brand.value === item.brand)) {
  //         acc.push({ value: item.brand, label: item.brand }); 
  //       }
  //       return acc;
  //     }, []);
  //     setBrands(allBrand);
  //     const allModels = bikes?.data?.reduce((acc: TSelectType[], item: TBike) => {
  //       if (!acc.some(model => model.value === item.model)) {
  //         acc.push({ value: item.model, label: item.model }); 
  //       }
  //       return acc;
  //     }, []);
      
  //     setModels(allModels);
  //     const allYears = bikes?.data?.reduce((acc: TYearSelectType[], item: TBike) => {
  //       if (!acc.some(brand => brand.value === item.year)) {
  //         acc.push({ value: item.year, label: item.year }); 
  //       }
  //       return acc;
  //     }, []);
  //     setYears(allYears);
  //   }
  // },[bikes])
  

  // const onChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearch = (value: string) => {
  //   console.log("search:", value);
  

  return (
    <div className="max-w-7xl mx-auto px-[5%] my-10">
      {/* <div className="grid gird-cols-1 md:grid-cols-3 gap-5 py-4">
        <div>
        <Select
          showSearch
          placeholder="Select A Model"
          optionFilterProp="label"
          className="w-full h-10"
          onChange={onChange}
          onSearch={onSearch}
          options={brands}
        />
      </div>
      <div>
        <Select
          showSearch
          placeholder="Select A Brand"
          optionFilterProp="label"
          className="w-full h-10"
          onChange={onChange}
          onSearch={onSearch}
          options={models}
        />
      </div>
      <div>
        <Select
          showSearch
          placeholder="Select A Year"
          className="w-full h-10"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={years}
        />
      </div>
      </div> */}
      
      <div className="parent flex flex-col sm:flex-row items-center max-w-xl mx-auto justify-center gap-y-4 sm:justify-between pr-2 sm:pr-1 sm:bg-white rounded-full mb-5 relative group transition-all duration-500 sm:border border-transparent sm:hover:border-indigo-600 focus-within:border-indigo-600">
        <input
          // onChange={(e)=>handleSearchBike(e.target.value)}
          type="text"
          className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white text-gray-900 bg-transparent border-none rounded-full placeholder-gray-400 focus:outline-none leading-normal"
          placeholder="Enter A Bike name "
        />
        <button  className="py-3 px-6 max-sm:w-full  rounded-full bg-indigo-600 text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:bg-indigo-700 sm:absolute top-1.5 right-3">
          Search Bike
        </button>
      </div>
    </div>
  );
};

export default SearchField;
