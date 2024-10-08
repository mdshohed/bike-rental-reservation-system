const HeroSection = () => {
  return (
    <section className="relative pt-44 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="w-full max-w-4xl mx-auto sm:px-12 mb-10 lg:mb-20">
          <h1 className="font-manrope font-bold text-4xl leading-snug sm:text-4xl text-center mb-5 text-black dark:text-white">
            Rent a bike any where in the<span className="text-[rgb(59_113_202/var(--tw-text-opacity))]"> Bangladesh</span>
          </h1>
          <p className="text-md font-medium leading-8 text-gray-400 text-center mb-14 max-w-xl mx-auto">
          Save money, meet awesome people, and consume less
          </p>
          <div className="parent flex flex-col sm:flex-row items-center max-w-xl mx-auto justify-center gap-y-4 sm:justify-between pr-2 sm:pr-1 sm:bg-white rounded-full mb-5 relative group transition-all duration-500 border border-transparent hover:border-indigo-600 focus-within:border-indigo-600">
            <input
              type="email"
              className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white text-gray-900 bg-transparent border-none rounded-full placeholder-gray-400 focus:outline-none leading-normal"
              placeholder="What’s your work email?"
            />
            <button className="py-3 px-6 max-sm:w-full  rounded-full bg-indigo-600 text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:bg-indigo-700 sm:absolute top-1.5 right-3">
              Get Started
            </button>
          </div>
          <p className="text-sm font-normal text-gray-500 text-center">
            no personal credit checks or founder guarantee.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:justify-between">
          <img
            src="https://pagedone.io/asset/uploads/1709270640.png"
            alt=""
            className="object-cover"
          />

          <img
            src="https://pagedone.io/asset/uploads/1710391965.png"
            alt=""
            className="mx-auto w-56 object-cover"
          />
          <img
            src="https://pagedone.io/asset/uploads/1709270672.png"
            alt=""
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
