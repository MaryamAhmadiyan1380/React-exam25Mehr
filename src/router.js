import { createBrowserRouter } from "react-router-dom";
import  NotFound  from "./Pages/NotFound";
import Main from "./layout/Main";
import { Home } from "./Pages/Home";
import { Add } from "./Pages/Add";
import { Exit } from "./Pages/Exit";
import { Login } from "./Login";
import { User } from "./Pages/User";
import { Profile } from "./Pages/Profile";



const router = createBrowserRouter([
    {
        // path: "/",
        // element: <Login/>,
        // errorElement: <UnhandledException/>,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "home",
                element: <Main />,

            },
            {
                path: "user",
                element: <User />,

            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "add",
                element: <Add />,
            },
            {
                path: "exit",
                element: <Exit/>,
            },
    {
        path: '*',
        element: <NotFound/>
    }
],
},
])

export default router;