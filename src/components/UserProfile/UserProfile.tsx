import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { TProfile } from "@/types/profile";
import { timeDiff } from "@/utils/common";

import { Clock6, Mail, MapPinHouse, Phone, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";

const UserProfile = () => {
  // Use the query without passing token explicitly
  //  const token = useAppSelector(useCurrentToken); // Get token from Redux
  const [toggle, setToggle] = useState(false);
  const [profileDetail, setProfileDetail] = useState<TProfile>({} as TProfile);

  const { data: profileData } = useGetProfileQuery(null);
  const [updateProfile] = useUpdateProfileMutation();
  useEffect(() => {
    if (profileData && profileData?.data) {
      const data = {
        name: profileData.data.name,
        email: profileData.data.email,
        phone: profileData.data.phone,
        address: profileData.data.address,
      };
      setProfileDetail(data);
    }
  }, [profileData]);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Loading In...");
    for (const key in profileDetail) {
      if (profileDetail[key as keyof TProfile] === "") {
        return toast.error("Input Field Mush not be Empty!", {
          id: toastId,
          duration: 2000,
        });
      }
    }

    const res = await updateProfile(profileDetail).unwrap();
    if (res.statusCode === 200 && res.success) {
      toast.success("Profile Updated Successfully!", {
        id: toastId,
        duration: 1000,
      });
      setToggle((e) => !e);
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="">
      <div className=" max-w-2xl mx-auto my-5 px-10 py-2 bg-gray-100 rounded-lg">
        <div className="flex w-[55px] justify-start relative z-10 mb-5">
          <img
            src="https://pagedone.io/asset/uploads/1705471668.png"
            alt="user-avatar-image"
            className="border-4 border-solid border-white rounded-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium text-2xl text-gray-900">
            @{profileData?.data?.name}
          </div>
          <div className="flex items-center justify-start gap-1">
            <div className="text-sm font-medium text-gray-500">
              <Clock6 className="w-[14px] " />
            </div>
            <div className="mt-1 font-medium text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Member Since {timeDiff(profileData?.data?.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {toggle ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center bg-gray-200">
            <div className="px-4 py-5 sm:px-6 ">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Update Profile
              </h3>
            </div>
            <div>
              {!toggle ? (
                <button
                  onClick={() => setToggle((current) => !current)}
                  className="text-indigo-600 me-10 hover:text-indigo-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>

          <div className="border mb-2 rounded-md border-gray-200 px-4 py-5 sm:p-0">
            <div className="p-4 ">
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={profileDetail.name}
                    onChange={(e) =>
                      setProfileDetail({
                        ...profileDetail,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter Full name"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={profileDetail.email}
                    disabled
                    // onChange={(e)=>setProfileDetail({...profileDetail, email: e.target.value})}
                    placeholder="Enter email"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={profileDetail.phone}
                    onChange={(e) =>
                      setProfileDetail({
                        ...profileDetail,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={profileDetail.address}
                    onChange={(e) =>
                      setProfileDetail({
                        ...profileDetail,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter address"
                  />
                </div>
              </div>
              <div className="flex py-5 items-center justify-center space-x-4">
                <button
                  onClick={handleUpdateProfile}
                  className=" bg-green-700 text-white hover:bg-primary-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Update
                </button>
                <button
                  onClick={() => setToggle((e) => !e)}
                  className="text-black bg-gray-300  inline-flex items-center border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col bg-gray-100 rounded-lg">
            <div className="py-5 flex justify-between items-center mx-10">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <button
                onClick={() => setToggle((current) => !current)}
                className="text-indigo-600  hover:text-indigo-900"
              >
                <UserRoundPen className="w-[20px] " />
              </button>
            </div>

            <div className="border-t border-gray-200 ">
              <dl className="sm:divide-y  sm:divide-gray-200 mx-10">
                {/* <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-md font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 font-medium text-md text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileData?.data?.name}
                  </dd>
                </div> */}
                <div className="py-3 sm:py-5 flex items-center justify-start gap-3">
                  <div className="text-sm font-medium text-gray-500">
                    <Mail className="w-[20px] h-[20px]" />
                    {/* Email address */}
                  </div>
                  <div className=" font-medium text-md ">
                    {profileData?.data?.email}
                  </div>
                </div>
                <div className="py-3 sm:py-5 flex items-center justify-start gap-3">
                  <dt className="text-sm font-medium text-gray-500">
                    <Phone className="w-[20px] h-[20px]" />
                    {/* Phone number */}
                  </dt>
                  <dd className="mt-1 font-medium text-md ">
                    {profileData?.data?.phone}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 flex items-center justify-start gap-3">
                  <dt className="text-sm font-medium text-gray-500">
                    <MapPinHouse className="w-[20px] h-[20px]" />
                    {/* Address */}
                  </dt>
                  <dd className="mt-1 font-medium text-md text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileData?.data?.address}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
