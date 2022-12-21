import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../../Pages/Auth/Login/Login";
import SignUp from "../../Pages/Auth/SignUp/SignUp";
import Checkout from "../../Pages/Checkout/Checkout";
import Home from "../../Pages/Home/Home";
import Error from "../../Pages/Shared/Error/Error";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/checkout",
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
        ]
    },
]);