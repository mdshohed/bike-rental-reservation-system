

const ContactSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-[5%] py-10">
      <div className="flex  flex-col lg:flex-row bg-gray-100 gap-5">
        {/* Contact Info Section */}
        <div className="lg:w-[50%]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact info</h2>
            <p className="text-gray-700">
              At Probike, we strongly believe that your online bike shop should be
              the hub for your everyday bicycling needs. Your local authorized
              Probike retailer should be able to provide the best services for you
              and your bicycle.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* San Francisco */}
            <div className="  rounded-lg ">
              <h3 className="text-xl font-semibold">San Francisco</h3>
              <p className="text-gray-600">
                1095 Howard Street, San Francisco, USA
                <br />
                <br />
                +(123) 456-760-9090
                <br />
                info@templaza.com
              </p>
            </div>

            {/* New York */}
            <div className=" rounded-lg ">
              <h3 className="text-xl font-semibold">New York</h3>
              <p className="text-gray-600">
                3497 Watson Street Camden, NJ 08102
                <br />
                <br />
                +(123) 456-789-0123
                <br />
                info@templaza.com
              </p>
            </div>
          </div>
        </div>

        {/* Get in Touch Section */}
        <div className="lg:w-[50%]">
          <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            method="post"
            action="/contact/"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Name Field */}
              <div className="w-full">
                <label
                  className="block text-gray-700"
                  htmlFor="wpforms-18211-field_3"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="wpforms-18211-field_3"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  name="wpforms[fields][3]"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="w-full">
                <label
                  className="block text-gray-700"
                  htmlFor="wpforms-18211-field_6"
                >
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="wpforms-18211-field_6"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  name="wpforms[fields][6]"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700"
                htmlFor="wpforms-18211-field_7"
              >
                Your Message
              </label>
              <textarea
                id="wpforms-18211-field_7"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                name="wpforms[fields][7]"
                placeholder="Your Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   
  );
};

export default ContactSection;
