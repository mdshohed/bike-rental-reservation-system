import {useGetSingleBikesQuery } from "@/redux/features/bikes/bikesApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";

import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);

import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import GlobalLoader from "../ui/loaders/GlobalLoader";
import { DatePicker, Modal } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { addBookingDetail } from "@/redux/features/rentalBike/rentalSlice";
import CompareBox from "./CompareBox";
import Swal from "sweetalert2";

const BikeView = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  const token = useAppSelector(useCurrentToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bikeData, isLoading } = useGetSingleBikesQuery(id);
  let [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  // const { data, isLoading: availableLoading }  = useGetSingleBikesAndBikeStatusQuery(id as string)

  // const { data: movie } = data.singleBike; 
  // const reviews = data.bikeStatus.data;

  const handleBookingProcess = () => {
    console.log("bikeIsAvailable", bikeData);
    if( !bikeData?.data?.isAvailable){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bike is Already Booked",
      });
      return;
    }
    if (!token) {
      setIsModalOpen(true);
    } else {
      setIsOpen((e) => !e);
    }
  };

  const handleNavigateToCheckout = () => {
    setIsOpen((e) => !e);
    // const selectedTime = new Date(selectedDate?.$d).toISOString();
    const selectedTime = selectedDate?.toDate().toISOString();

    if (selectedTime) {
      const payload = {
        bookingId: id,
        selectedTime: selectedTime,
        method: "create",
      };

      dispatch(addBookingDetail(payload));
      navigate(`/checkout`);
    }
  };

  return (
    <>
      {isLoading && <GlobalLoader />}

      <div className="bg-gray-100 dark:bg-gray-800 pb-10 pt-[60px] text-gray-900 dark:text-gray-200 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <div className=" rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src="https://imgd.aeplcdn.com/664x374/n/cw/ec/43482/sp-125-right-front-three-quarter-2.jpeg?isig=0&q=80"
                  alt="Product Image"
                />
              </div>
            </div>

            <div className="px-4 flex flex-col justify-around min-h-[300px] ">
              <div>
                <h2 className="text-2xl  md:text-start font-bold text-gray-800 dark:text-white ">
                  {bikeData?.data.name}
                </h2>
              </div>
              
              <div>
                <p className="whitespace-nowrap text-lg">
                  Brand:{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {bikeData?.data.brand}
                  </span>
                </p>
              </div>

              <div>
                <p className="whitespace-nowrap text-lg">
                  Year:{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {bikeData?.data.year}
                  </span>
                </p>
              </div>

              <div>
                <p className="whitespace-nowrap text-lg">
                  Model:{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {bikeData?.data.model}
                  </span>
                </p>
              </div>
              <div>
                <p className="whitespace-nowrap text-lg">
                  Engine Capacity:{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {bikeData?.data.cc} cc
                  </span>
                </p>
              </div>

              <div className="flex text-lg justify-start items-center mb-4">
                <p>Rental Cost: </p>
                <p>
                  <span className="text-green-500 ms-2 font-bold ">
                    ${bikeData?.data.pricePerHour.toFixed(2)}
                  </span>
                  /Hour
                </p>
              </div>

              <div
                onClick={handleBookingProcess}
                className="flex -m-2"
              >
                <div className="w-full">
                  {
                    bikeData?.data?.isAvailable ?
                    <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                      Book Now
                    </button>
                    : 
                    <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                      Booked
                    </button>
                  }
                  
                </div>
              </div>
            </div>
            
          </div>
          <div className="my-4">
            <p className="text-gray-600 font-semibold  md:text-start dark:text-gray-300 text-[14px] sm:text-[18px]">
              Description: <span className="font-normal"> {bikeData?.data.description}</span>
            </p>
          </div>
          
          <CompareBox id={bikeData?.data._id}></CompareBox>
          
          {isOpen ? (
            <>
              <AnimatePresence>
                {isOpen && (
                  <Dialog
                    static
                    open={isOpen}
                    onClose={() => setIsOpen(true)}
                    className="relative z-50"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50"
                    />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="fixed inset-0 flex mb-[100px] w-screen items-center justify-center p-2"
                    >
                      <DialogPanel
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-lg rounded-md space-y-4 bg-white p-8 "
                      >
                        <Description className="text-xl">
                          Rental Booking Process
                        </Description>
                        <div className=" text-md font-semibold pb-8  pt-4 border-b border-slate-300  flex  items-center gap-x-3">
                          <p className="whitespace-nowrap ">Select Slot</p>
                          {": "}

                          <DatePicker
                            defaultValue={selectedDate}
                            showTime
                            // locale={buddhistLocale}
                            minDate={dayjs(new Date())}
                            onChange={(date) => setSelectedDate(date)}
                          />
                        </div>
                        <div className="flex gap-4 justify-end ">
                          <div onClick={() => setIsOpen(false)}>
                            <button className="btn bg-gray-200 px-4 py-2 text-md rounded-md text-black">
                              Cancel
                            </button>
                          </div>
                          <div onClick={handleNavigateToCheckout}>
                            <button className="btn bg-blue-500 px-7 py-2 text-md rounded-md text-white">
                              Pay
                            </button>
                          </div>
                        </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                )}
              </AnimatePresence>
            </>
          ) : null}

          <Modal
            open={isModalOpen}
            title="Login Required for Booking"
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={() => (
              <div className="flex  justify-end items-stretch">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate("/login")}
                >
                  Yes, Proceed to Login
                </button>
              </div>
            )}
          >
            <p>To proceed with booking, you need to be logged in.</p>
            <p>Would you like to log in now?</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default BikeView;
