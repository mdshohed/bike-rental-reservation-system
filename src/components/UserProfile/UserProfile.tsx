const UserProfile = () => {
  return (
    <div className="">
      <div className=" max-w-7xl mx-auto ">
        <div className="shadow rounded-lg border ">
          <div className="flex flex-col justify-center items-center pt-5">
            <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
              <img
                src="https://pagedone.io/asset/uploads/1705471668.png"
                alt="user-avatar-image"
                className="border-4 border-solid border-white rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
              <div className="block">
                <h3 className="font-manrope font-bold text-3xl text-gray-900 mb-1">
                  Shohedul Islam
                </h3>
                <p className="font-normal text-base leading-7 text-gray-500">
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center bg-gray-200">
               <div className="px-4 py-5 sm:px-6 ">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile
                </h3>
                {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the user.
                </p> */}
              </div>
              <div>
              <button className="text-indigo-600 me-10 hover:text-indigo-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                </button>
              </div>
            </div>
           
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    John Doe
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    johndoe@example.com
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    (123) 456-7890
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St
                    <br />
                    Anytown, USA 12345
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
