import { Link } from "react-router-dom";
import logo from "../../assets/logo/bike-share-removebg-preview.png";

const Register = () => {
  return (
    <div className="overflow-hidden py-32 lg:pb-24 bg-gray-100">

      <div className="flex flex-col  font-[sans-serif]">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center ">
            
              <img
                src={logo}
                alt="logo"
                className="w-40 inline-block"
              />
          
          </div>
          <h2 className="text-gray-800 text-center text-2xl font-bold">
                Register in
              </h2>
          <form>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Full Name"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Phone
                </label>
                <input
                  name="phone"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Phone"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Address
                </label>
                <input
                  name="address"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Address"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="cpassword"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="button"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
