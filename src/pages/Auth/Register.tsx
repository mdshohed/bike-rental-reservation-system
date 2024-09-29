import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/bike-zone-2.png";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { TUser } from "@/utils";
import { toast } from "sonner";
import { useSignUpMutation } from "@/redux/features/auth/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState<TUser>({} as TUser);

  const [SignUp, { data, error }] = useSignUpMutation();

  console.log("data => ", data);
  console.log("error => ", error);

  const onSubmit = async (e: FieldValues) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in");

    for (const key in register) {
      if (register[key as keyof TUser] === "") {
        return toast.error(`${key} field is required!`, {
          id: toastId,
          duration: 2000,
        });
      }
    }
    if (register.password !== register.cpassword) {
      return toast.error("Password Not Match!", {
        id: toastId,
        duration: 2000,
      });
    }
    try {
      await SignUp(register).unwrap();

      toast.success("Register Successful!", { id: toastId, duration: 2000 });
      navigate(`/login`);
    } catch (err) {
      // toast('My action toast', {
      //   action: {
      //     label: 'Action',
      //     onClick: () => console.log('Action!'),
      //   },
      // });
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="overflow-hidden py-10 lg:pb-24  bg-zinc-50 text-surface/75 dark:bg-gray-900 dark:text-white/75">
      <div className="flex flex-col  font-[sans-serif]">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center ">
            <img src={logo} alt="logo" className="w-[180px] inline-block" />
          </div>
          <h2 className=" text-center text-2xl font-bold">
            Sign Up
          </h2>
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              <div>
                <label className=" text-sm mb-2 block">
                  User Name
                </label>
                <input
                  onChange={(e) =>
                    setRegister({ ...register, name: e.target.value })
                  }
                  name="name"
                  type="text"
                  className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Full Name"
                />
              </div>
              <div>
                <label className=" text-sm mb-2 block">
                  Email
                </label>
                <input
                  onChange={(e) =>
                    setRegister({ ...register, email: e.target.value })
                  }
                  name="email"
                  type="text"
                  className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className=" text-sm mb-2 block">
                  Phone
                </label>
                <input
                  onChange={(e) =>
                    setRegister({ ...register, phone: e.target.value })
                  }
                  name="phone"
                  type="text"
                  className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Phone"
                />
              </div>
              <div>
                <label className=" text-sm mb-2 block">
                  Address
                </label>
                <input
                  onChange={(e) =>
                    setRegister({ ...register, address: e.target.value })
                  }
                  name="address"
                  type="text"
                  className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Address"
                />
              </div>
              <div>
                <label className=" text-sm mb-2 block">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  }
                  name="password"
                  type="password"
                  className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className=" text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  onChange={(e) =>
                    setRegister({ ...register, cpassword: e.target.value })
                  }
                  name="cpassword"
                  type="password"
                  className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
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
                  className=" ml-3 block text-sm"
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
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className=" text-sm mt-6 text-center">
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
