import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, setUser, TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/logo/bike-zone.png";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken); 
  const currentUser = useAppSelector(selectCurrentUser); 
  if(token&&currentUser) {
    return <Navigate to={`/${currentUser.role}/dashboard`} replace={true}></Navigate>
  }
  // const { register, handleSubmit } = useForm(
  //   {
  //     defaultValues: {
  //       userId: 'A-0001',
  //       password: '12345'
  //     }
  //   }
  // );
  // const { register } = useFormContext();
  const defaultValues = {
    userId: "A-0001",
    password: "12345",
  };

  const [login, { data, error }] = useLoginMutation();

  // console.log("data => ", data);
  // console.log("error => ", error);

  // const [loginDetails, setLoginDetails] = useState<{email:string, password:string}>({email:'', password:''})
  const onSubmit = async (e: FieldValues) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: email,
        password: password,
      };
      const res = await login(userInfo).unwrap();
   
      const user = verifyToken(res.token) as TUser;
      
      dispatch(setUser({ user: user, token: res.token }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const [show, setShow] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [toggle, setToggle] = useState('0');
  // const product = ['apple', 'orange', 'avocado', 'mango', 'peer'];

  // const handleToggle = () => {
  //   setToggle(toggle === '0' ? '1' : '0');
  // };

  return (
    <div className="relative py-10 bg-zinc-50 text-surface/75 dark:bg-gray-900 dark:text-white/75">

      <div className="flex flex-col justify-center font-[sans-serif] ">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-4">
            <img src={logo} alt="logo" className="w-32 inline-block" />
          </div>
          <h2 className=" text-center text-2xl font-bold">
            Sign in
          </h2>
          <form onSubmit={onSubmit} className=" space-y-4">
            <div>
              <label className=" text-sm mb-2 block">
                User Email
              </label>
              <div className="relative flex items-center">
                <input
                  // onChange={(e)=>setLoginDetails({...loginDetails, email:e.target.value})}
                  // value={loginDetails.email}
                  name="email"
                  type="email"
                  required
                  className="w-full  text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter user Email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label className=" text-sm mb-2 block">Password</label>
              {/* <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full  text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div> */}
              <div className="relative items-center">
                <input
                  // onChange={(e)=>setLoginDetails({...loginDetails, password:e.target.value})}
                  // value={loginDetails.password}
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter The Password"
                  className="w-full text-black text-sm px-4 my-3  rounded border py-3 outline-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inline-block bottom-7 right-5"
                >
                  {!show ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                       stroke="#bbb"
                      
                      className="w-4 h-4 "

                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm "
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="!mt-8">
              <button
                // onClick={handleSubmit}
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign in
              </button>
            </div>
            <p className=" text-sm !mt-8 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
