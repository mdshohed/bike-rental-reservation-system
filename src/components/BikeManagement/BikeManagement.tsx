/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { AlignJustify, MapPinHouse, Phone } from "lucide-react";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikesApi";
import BikeCard1 from "./BikeCard1";
import { TBike } from "@/utils";
import BikeCard2 from "./BikeCard2";
import GlobalLoader from "../ui/loaders/GlobalLoader";
import hand from '../../assets/images/hand.png'
import wheel from '../../assets/images/spin-wheel.png'

import { Select } from "antd";
import {  useNavigate } from "react-router-dom";
const sortOptions = [
  { label: "Default", value: "all" },
  { label: "Cost: Low to High", value: "low" },
  { label: "Cost: High to Low", value: "high" },
];

type TSelectType = {
  value: string;
  label: string;
  isTrue: boolean;
};
type TYearSelectType = {
  value: number;
  label: number;
};


const BikeManagement = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [cardMode, setCardMode] = useState("list");
  const { data, isLoading } = useGetAllBikesQuery(null);
  const [bikes, setBikes] = useState<TBike[]>([])

  const [models, setModels] = useState<TSelectType[]>([]);
  const [brands, setBrands] = useState<TSelectType[]>([]);
  const [years, setYears] = useState<TYearSelectType[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  useEffect(() => {
    if (data?.data && data) {
      setBikes(data?.data); 
    }
  }, [data]);

  useEffect(() => {
    if (data?.data && data) {
      const allBrand = data?.data?.reduce(
        (acc: TSelectType[], item: TBike) => {
          if (!acc.some((brand) => brand.value === item.brand)) {
            acc.push({ value: item.brand, label: item.brand });
          }
          return acc;
        },
        []
      );
      // const newBrand = [{ label: "All Brands", value: "all" }, ...allBrand];
      const newBrand = [...allBrand];
      setBrands(newBrand);
      const allModels = data?.data?.reduce(
        (acc: TSelectType[], item: TBike) => {
          if (!acc.some((model) => model.value === item.model)) {
            acc.push({ value: item.model, label: item.model });
          }
          return acc;
        },
        []
      );
      const newModels = [ ...allModels];
      setModels(newModels);
      const allYears = data?.data?.reduce(
        (acc: TYearSelectType[], item: TBike) => {
          if (!acc.some((brand) => brand.value === item.year)) {
            acc.push({ value: item.year, label: item.year });
          }
          return acc;
        },
        []
      );
      const newYears = [...allYears];
      setYears(newYears);
    }
  }, [data]);

  useEffect(()=>{
    console.log("", selectedBrands, selectedModels, selectedYears);

    if((!selectedBrands.length)&&(!selectedModels.length)&&(!selectedYears.length)){
      setBikes(data?.data);
      
    }
    else{
      const filterData = data?.data?.filter((item: TBike) => {
        return selectedBrands.includes(item.brand) || selectedModels.includes(item.model) || selectedYears.includes(item.year);
      });
      setBikes(filterData) 
    }

  },[selectedBrands,selectedModels,selectedYears])

  const onBrandChange = (values: string[]) => {
    // const newBikes = data?.data?.filter((item: TBike) => {
    //   return values.includes(item.brand);
    // });    
    setSelectedBrands(values);
  }
  
  const onModelChange = (values: string[]) => {
    setSelectedModels(values)
  };
  const onYearChange = (values: number[]) => {
    setSelectedYears(values)
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const navigate = useNavigate(); 

  const handleNavigateAndScroll = () => {
    navigate("/home");
    setTimeout(() => {
      const element = document.getElementById("spin");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 0); // Delay to ensure navigation happens first
  };

  // filter function
  const handleSearchBike = (e: string) =>{
    const newBikes = data?.data.filter( (item: TBike)=>item.name.includes(e.trim()));
    setBikes(newBikes); 
  }

  return (
    <div className="">
      {isLoading && <GlobalLoader />}

      <div className="dark:bg-gray-900 dark:text-white text-gray-900 bg-white bg-opacity-25 ">
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 "
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              {/* <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only text-gray-400 dark:text-white">
                  Categories
                </h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form> */}
              <div className="grid gird-cols-1 px-4">
                <div className="mt-5">
                  <p className="font-semibold  pb-2">All Brands</p>
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Select A Brand"
                    optionFilterProp="label"
                    className="w-full "
                    onChange={onBrandChange}
                    onSearch={onSearch}
                    options={brands}
                  />
                </div>
                <div className="mt-5">
                  <p className="font-semibold  pb-2">All Models</p>

                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Select A Model"
                    optionFilterProp="label"
                    className="w-full "
                    onChange={onModelChange}
                    onSearch={onSearch}
                    options={models}
                  />
                </div>
                <div className="mt-5">
                  <p className="font-semibold  pb-2">All Years</p>

                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Select A Year"
                    className="w-full"
                    optionFilterProp="label"
                    onChange={onYearChange}
                    onSearch={onSearch}
                    options={years}
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search Button */}
          <div className="parent mt-[60px] flex flex-col sm:flex-row items-center max-w-xl mx-auto justify-center gap-y-4 sm:justify-between pr-2 sm:pr-1 sm:bg-white rounded-full relative group sm:border border-transparent sm:border-indigo-600 focus-within:border-indigo-600">
            <input
              type="text"
              onChange={(e)=>handleSearchBike(e.target.value)}
              className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white text-gray-900 bg-transparent rounded-full placeholder-gray-400 focus:outline-none leading-normal border border-indigo-600 sm:border-none"
              placeholder="Enter A Bike name "
            />
            <button className="py-3 px-6 max-sm:w-full  rounded-full bg-indigo-600 text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:bg-indigo-700 sm:absolute top-1.5 right-3">
              Search Bike
            </button>
          </div>

          <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-5 ">
            <h1 className="text-xl font-bold tracking-tight">Bike List</h1>

            <div className="flex items-center">
              {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-white/75 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-white group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white  shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-black dark:text-white' : ' ',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu> */}
              <div className="flex  flex-row justify-center items-center">
                <p className="font-semibold me-2">Sort</p>
                <Select
                  showSearch
                  placeholder="Select A Model"
                  // defaultValue="All Brands"
                  optionFilterProp="label"
                  className="w-40"
                  // onChange={onChange}
                  // onSearch={onSearch}
                  options={sortOptions}
                />
              </div>
              <button
                onClick={() => setCardMode("square")}
                type="button"
                className="-m-2 ml-5  hover:text-gray-500 "
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCardMode("list")}
                type="button"
                className="    hover:text-gray-500 ml-7"
              >
                <span className="sr-only">View grid</span>
                <AlignJustify className="h-6 w-6 font-bold " />
              </button>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2  hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Bikes
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                {/* <SearchField></SearchField> */}
                <div className="grid gird-cols-1 ">
                  <div className="mt-5">
                    <p className="font-semibold  pb-2">All Brands</p>
                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Select A Brand"
                      // defaultValue="all"
                      optionFilterProp="label"
                      className="w-full "
                      onChange={onBrandChange}
                      onSearch={onSearch}
                      options={brands}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-semibold  pb-2">All Models</p>

                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Select A Model"
                      // defaultValue="all"
                      optionFilterProp="label"
                      className="w-full "
                      onChange={onModelChange}
                      onSearch={onSearch}
                      options={models}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-semibold  pb-2">All Years</p>

                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Select A Year"
                      // defaultValue="all"
                      className="w-full "
                      optionFilterProp="label"
                      onChange={onYearChange}
                      onSearch={onSearch}
                      options={years}
                    />
                  </div>
                </div>

                <div className="mt-10 ">
                  <p className="text-2xl font-semibold">Want A Discount</p>
                  <div className="border border-red-500 w-[50%] mt-1"></div>
                  <div>
                    <div className="flex justify-start items-center py-3">
                        <img src={hand} alt="" />
                        <div className="cursor-pointer" onClick={handleNavigateAndScroll}>
                          <img className="w-20 ms-5" src={wheel} alt="" />
                        </div>
                    </div>
                      <p>Go to Spin wheen Section to get a Coupon Code</p>
                    {/* <div class="v-image__image v-image__image--cover" style="background-image: url(&quot;https://www.babu88.app/static/image/wof/wofSpin.gif&quot;); background-position: center center;"></div> */}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-2xl font-semibold">Contact Us</p>
                  <div className="border border-red-500 w-[30%] mt-1"></div>
                  <div>
                    <div className="flex justify-start items-center">
                      <MapPinHouse />
                      <div className="ms-2">
                        <p className="text-lg">Address</p>
                        <p>New York, NY 10012, US</p>
                      </div>
                    </div>
                    <div className="flex justify-start items-center">
                    <Phone />
                      <div className="ms-2">
                        <p className="text-lg">Phone</p>
                        <p>01886547654</p>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>

              {/* <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium ">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white e py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium ">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form> */}

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16"> */}
                {cardMode === "list" ? (
                  <div className="grid grid-cols-1 gap-y-5">
                    {bikes?.map((item: TBike) => (
                      <BikeCard2 item={item}></BikeCard2>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1  sm:grid-cols-2 gap-10">
                    {bikes?.map((item: TBike) => (
                      <BikeCard1 item={item}></BikeCard1>
                    ))}
                  </div>
                )}

                {/* </div> */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BikeManagement;
