import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";
import Home from "../pages/Home/Home";
import { userPaths } from "./user.routes";
import ErrorPage from "@/pages/Shared/ErrorPage";
import HomeLayout from "@/components/layout/HomeLayout";
import About from "@/pages/About";
import BikeManagement from "@/components/BikeManagement/BikeManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/bike-management',
        element: <BikeManagement />,
      },
      {
        path: '/about-us',
        element: <About />,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/admin",
        element: <App></App>,
        children: routeGenerator(adminPaths),
      },
      {
        path: "/user",
        element: <App></App>,
        children: routeGenerator(userPaths)
      },
    ],
  },
  
])

export default router;