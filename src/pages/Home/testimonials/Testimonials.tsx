import React from "react";

const Testimonials = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row items-center py-8 max-w-7xl px-[5%] mx-auto">
        <div className="lg:w-[40%] p-5">
          <div className="text-center mb-8">
            <span className="text-gray-500 text-sm">Testimonials</span>
            <h3 className="text-2xl font-bold mt-2">
              See what they said about us
            </h3>
          </div>
          <p className="text-center max-w-xl mb-8">
            The Probike strives to give the best customer service possible. We
            believe every customer should feel welcome and comfortable in our
            shops. Below are a few emails we have received from happy customers.
          </p>
          <div className="lg:flex flex-col items-center py-4 hidden ">
            <h3 className="text-xl font-bold mb-2">
              <img
                loading="lazy"
                decoding="async"
                width="160"
                height="145"
                src="https://probike.templaza.net/wp-content/uploads/2023/08/quote.svg"
                className="w-20 h-16 mb-2"
                alt="Quote Icon"
              />
            </h3>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:w-[60%]">
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-24 h-24 rounded-full mb-4"
              src="https://probike.templaza.net/wp-content/uploads/2023/08/33-300x300.jpg"
              alt="Elizabeth Bailey"
            />
            <h3 className="text-lg font-bold">Elizabeth Bailey - Customer</h3>
            <p className="text-gray-500 mt-2">
              “I had a fantastic experience today buying my first road bike. I'm
              pretty intimidated by the sport, but Wayne never treated me like I
              was stupid.”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-24 h-24 rounded-full mb-4"
              src="https://probike.templaza.net/wp-content/uploads/2023/08/co-founder2-300x300.jpg"
              alt="Elizabeth Bailey"
            />
            <h3 className="text-lg font-bold">Elizabeth Bailey - Customer</h3>
            <p className="text-gray-500 mt-2">
              "I brought my Trek bike in to get the brakes adjusted. Not only
              did Daniel see me right away, but also he went above-and-beyond in
              checking out the bike."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-24 h-24 rounded-full mb-4"
              src="https://probike.templaza.net/wp-content/uploads/2023/08/co-founder1.jpg"
              alt="Shannon"
            />
            <h3 className="text-lg font-bold">Shannon - Customer</h3>
            <p className="text-gray-500 mt-2">
              "I just purchased a 2013 Domane from the Springfield store. I want
              to pass along to you that I had an excellent experience working
              with them."
            </p>
          </div>

          {/* Testimonial 4 */}
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-24 h-24 rounded-full mb-4"
              src="https://probike.templaza.net/wp-content/uploads/2023/08/Why-Choose-Us.jpg"
              alt="Majida"
            />
            <h3 className="text-lg font-bold">Majida - Customer</h3>
            <p className="text-gray-500 mt-2">
              "I had a great experience with the salesmen who helped me. I
              wanted to let you know your staff have earned a loyal customer."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
