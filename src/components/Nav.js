import { BrowserRouter as Route } from "react-router-dom"
import { Home } from "../Pages/Home"
import { User } from "../Pages/User"
import { Profile } from "../Pages/Profile"
import { Login } from "../Login"

export const Nav = () => {
    <>
    <Route path='/' element={<Home/>} />
         <Route path='/user' element={<User />} />
         <Route path='/profile' element={<Profile />} />
         <Route path='/login' element={<Login/>}/>
         </>
    
}